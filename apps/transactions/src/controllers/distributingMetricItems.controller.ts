import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
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
import {
  INCORRECT_IDS_MSG,
  INVALID_TOKEN_MSG,
  INVALID_USER_MSG,
  USER_IS_NOT_ACTIVE_MSG,
} from '@common/constants/errorMessages.constants';

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

  @ApiOperation({ description: 'Get your subscriptions' })
  @ApiOkResponse({
    description: 'IDistributingMetricItem array',
    schema: {
      type: 'array',
      items: {
        properties: {
          user: { type: 'IUser' },
          period: { type: 'string' },
          metric: { type: 'integer' },
          category: { type: 'ITransactionCategory' },
          baseCurrency: { type: 'ICurrency' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'string',
      examples: [
        'Incorrect token',
        INVALID_USER_MSG,
        USER_IS_NOT_ACTIVE_MSG,
        INVALID_TOKEN_MSG,
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
  @OnlyRoles(Roles.USER)
  @Get('/')
  getUserSubscriptions(
    @User() user: IUserCredential,
  ): Promise<DistributingMetricItemDto[]> {
    return this.distributingMetricsInputPort.getUserSubscriptions(user);
  }

  @ApiUnauthorizedResponse({
    schema: {
      type: 'string',
      examples: [
        'Incorrect token',
        INVALID_USER_MSG,
        USER_IS_NOT_ACTIVE_MSG,
        INVALID_TOKEN_MSG,
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
    let preparedItems: IDistributingMetricItem[] = null;
    try {
      preparedItems = await Promise.all(
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
    } catch (e) {
      throw new BadRequestException(INCORRECT_IDS_MSG);
    }
    if (preparedItems) {
      return this.distributingMetricsInputPort.subscribe(preparedItems);
    }
  }

  @ApiUnauthorizedResponse({
    schema: {
      type: 'string',
      examples: [
        'Incorrect token',
        INVALID_USER_MSG,
        USER_IS_NOT_ACTIVE_MSG,
        INVALID_TOKEN_MSG,
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
    let preparedItems: IDistributingMetricItem[] = null;
    try {
      preparedItems = await Promise.all(
        ids.map(
          (id: string): Promise<IDistributingMetricItem> =>
            this.distributingMetricItemsRepo.findById(id),
        ),
      );
    } catch (e) {
      throw new BadRequestException(INCORRECT_IDS_MSG);
    }
    if (preparedItems) {
      return this.distributingMetricsInputPort.unsubscribe(
        preparedItems.filter(item => item.user.id === user.id),
      );
    }
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
