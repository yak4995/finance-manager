import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';

import { DistributingMetricItemDto } from '../dtos/distributingMetricItem.dto';
import { CurrenciesFacade } from '../facades/currencies.facade';
import { TransactionCategoriesFacade } from '../facades/transactionCategories.facade';

import IRepository from '@domain/repository.interface';
import { Period } from '@domain/period/enums/period.enum';

import IDistributingMetricItem from '@app/transactions/entities/distributingMetricItem.interface';
import ReportDistributionInputPort from '@app/transactions/ports/reportDistributionInput.port';
import DistributingMetricItemAbstractFactory from '@app/transactions/factories/distributingMetricItemFactory';
import { Roles } from '@app/users/enums/roles.enum';
import IUserCredential from '@app/users/entities/userCredential.interface';

import { OnlyRoles } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Distributing metrics management')
@Controller('/distributing-metrics')
export class DistributingMetricItemsController {
  private readonly distributingMetricItemsRepo: IRepository<
    IDistributingMetricItem
  >;

  constructor(
    @Inject('ReportDistributionInputPort')
    private readonly distributingMetricsInputPort: ReportDistributionInputPort,
    distributingMetricItemsFactory: DistributingMetricItemAbstractFactory,
    private readonly currenciesFacade: CurrenciesFacade,
    private readonly transactionCategoriesFacade: TransactionCategoriesFacade,
  ) {
    this.distributingMetricItemsRepo = distributingMetricItemsFactory.createDistributingMetricItemRepo();
  }

  @ApiUnauthorizedResponse({
    schema: {
      type: 'string',
      examples: [
        'Incorrect token',
        'User from token is invalid!',
        'User is not active!',
        'User token is invalid or expired',
      ],
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'string',
      example: 'This user doesn`t have any of these groups',
    },
  })
  @UseGuards(JwtAuthGuard)
  @OnlyRoles(Roles.ADMINISTRATOR, Roles.USER)
  @Post('subscribe')
  async subscribe(
    @User() user: IUserCredential,
    @Body() items: DistributingMetricItemDto[],
  ): Promise<any> {
    const preparedItems: IDistributingMetricItem[] = await Promise.all(
      items.map(
        async (
          item: DistributingMetricItemDto,
        ): Promise<IDistributingMetricItem> => ({
          id: undefined,
          metric: item.metric,
          period: item.period,
          baseCurrency: item?.baseCurrency
            ? await this.currenciesFacade.findById(item?.baseCurrency)
            : null,
          category: item?.category
            ? await this.transactionCategoriesFacade.findById(item?.category)
            : null,
          user,
        }),
      ),
    );
    return this.distributingMetricsInputPort.subscribe(preparedItems);
  }

  @ApiUnauthorizedResponse({
    schema: {
      type: 'string',
      examples: [
        'Incorrect token',
        'User from token is invalid!',
        'User is not active!',
        'User token is invalid or expired',
      ],
    },
  })
  @ApiForbiddenResponse({
    schema: {
      type: 'string',
      example: 'This user doesn`t have any of these groups',
    },
  })
  @UseGuards(JwtAuthGuard)
  @OnlyRoles(Roles.ADMINISTRATOR, Roles.USER)
  @Delete('unsubscribe')
  async unsubscribe(
    @User() user: IUserCredential,
    @Body() ids: string[],
  ): Promise<any> {
    const preparedItems: IDistributingMetricItem[] = await Promise.all(
      ids.map(
        (id: string): Promise<IDistributingMetricItem> =>
          this.distributingMetricItemsRepo.findById(id),
      ),
    );
    return this.distributingMetricsInputPort.unsubscribe(
      preparedItems.filter(item => item.user.id === user.id),
    );
  }

  // 28-th day of every month at 23:59:00
  @Cron('0 59 23 28 * *')
  // @Cron('0 * * * * *') // for test only
  async send(): Promise<any[]> {
    const now = new Date();
    let metrics = await this.distributingMetricItemsRepo.findByAndCriteria({
      period: Period.MONTH,
    });
    if ([2, 5, 8, 11].includes(now.getMonth())) {
      const quarterMetrics = await this.distributingMetricItemsRepo.findByAndCriteria(
        {
          period: Period.QUARTER,
        },
      );
      if (quarterMetrics.length > 0) {
        metrics = metrics.concat(quarterMetrics);
      }
    }
    if (now.getMonth() === 0) {
      const yearMetrics = await this.distributingMetricItemsRepo.findByAndCriteria(
        {
          period: Period.YEAR,
        },
      );
      if (yearMetrics.length > 0) {
        metrics = metrics.concat(yearMetrics);
      }
    }
    return Promise.all(
      metrics.map(m => this.distributingMetricsInputPort.send(m)),
    );
  }
}
