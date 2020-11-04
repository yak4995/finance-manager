import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  UseGuards,
  Controller,
  Inject,
  Get,
  Query,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';

import { PaginationDto } from '../dtos/pagination.dto';
import { TransactionsCategoryRangeDto } from '../dtos/transactionsCategoryRange.dto';
import { TransactionDto } from '../dtos/transaction.dto';
import { TransactionsDateRangeDto } from '../dtos/transactionsDateRange.dto';
import { TransactionsRangeDto } from '../dtos/transactionsRange.dto';
import { CurrenciesFacade } from '../facades/currencies.facade';
import { TransactionCategoriesFacade } from '../facades/transactionCategories.facade';

import { Roles } from '@app/users/enums/roles.enum';
import TransactionManagementInputPort from '@app/transactions/ports/transactionManagementInput.port';
import TransactionAnalyticInputPort from '@app/transactions/ports/transactionAnalyticInput.port';

import IRepository from '@domain/repository.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';
import TransactionAbstractFactory from '@domain/transactions/factories/transactionFactory';
import IUser from '@domain/users/entities/user.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ICurrency from '@domain/currencies/entities/currency.interface';

import { OnlyRoles } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import JwtAuthGuard from '@common/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Transaction management')
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
@Controller('transactions')
export default class TransactionController {
  private readonly transactionsRepo: IRepository<ITransaction>;

  constructor(
    @Inject('TransactionManagementInputPort & TransactionAnalyticInputPort')
    private readonly transactionInputPort: TransactionManagementInputPort &
      TransactionAnalyticInputPort,
    private readonly transactionFactory: TransactionAbstractFactory,
    private readonly currenciesFacade: CurrenciesFacade,
    private readonly transactionCategoriesFacade: TransactionCategoriesFacade,
  ) {
    this.transactionsRepo = this.transactionFactory.createTransactionRepo();
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'page and perPage have to be more than 0',
    },
  })
  @Get('/')
  getTransactions(
    @User() user: IUser,
    @Query() payload: PaginationDto,
  ): Promise<any> {
    if (Number(payload.page) < 1 || Number(payload.perPage) < 1) {
      throw new BadRequestException('page and perPage have to be more than 0');
    }
    return this.transactionInputPort.getTransactions(
      user,
      Number(payload.page),
      Number(payload.perPage),
      {
        [payload.orderField]: payload.orderBy,
      },
    );
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('/category')
  async getTransactionsByCategory(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    try {
      const category: ITransactionCategory = await this.transactionCategoriesFacade.findById(
        payload.categoryId,
      );
      return this.transactionInputPort.getTransactionsByCategory(
        user,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
        category,
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @Get('search/:content')
  search(@User() user: IUser, @Param('content') content: string): Promise<any> {
    return this.transactionInputPort.search(user, content);
  }

  @Post()
  addTransaction(
    @User() user: IUser,
    @Body() payload: TransactionDto,
  ): Promise<any> {
    return this.transactionInputPort.addTransaction(user, payload);
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction id is invalid',
    },
  })
  @Patch(':id')
  async updateTransaction(
    @User() user: IUser,
    @Param('id') transactionId: string,
    @Body() payload: TransactionDto,
  ): Promise<any> {
    try {
      const transaction: ITransaction = await this.transactionsRepo.findById(
        transactionId,
      );
      return this.transactionInputPort.updateTransaction(
        user,
        transaction,
        payload,
      );
    } catch (e) {
      throw new BadRequestException('Transaction id is invalid');
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction id is invalid',
    },
  })
  @Delete(':id')
  async deleteTransaction(
    @User() user: IUser,
    @Param('id') transactionId: string,
  ): Promise<any> {
    try {
      const transaction: ITransaction = await this.transactionsRepo.findById(
        transactionId,
      );
      return this.transactionInputPort.deleteTransaction(user, transaction);
    } catch (e) {
      throw new BadRequestException('Transaction id is invalid');
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('report/count')
  async getTransactionsCountBy(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    try {
      const [category, transactions]: [
        ITransactionCategory,
        ITransaction[],
      ] = await Promise.all([
        this.transactionCategoriesFacade.findById(payload.categoryId),
        this.transactionsRepo.findByAndCriteria({
          owner: user,
          range: {
            field: 'datetime',
            from: payload.dateStart,
            to: payload.dateEnd,
          },
        }),
      ]);
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionsCountBy(
        category,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('/report/sum')
  async getTransactionsSumBy(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    try {
      const [baseCurrency, category, transactions]: [
        ICurrency,
        ITransactionCategory,
        ITransaction[],
      ] = await Promise.all([
        this.currenciesFacade.findByCode('UAH'),
        this.transactionCategoriesFacade.findById(payload.categoryId),
        this.transactionsRepo.findByAndCriteria({
          owner: user,
          range: {
            field: 'datetime',
            from: payload.dateStart,
            to: payload.dateEnd,
          },
        }),
      ]);
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionsSumBy(
        category,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
        baseCurrency,
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @Get('/report/count-by-range')
  async getTransactionsCountForDateRange(
    @User() user: IUser,
    @Query() payload: TransactionsDateRangeDto,
  ): Promise<any> {
    const transactions: ITransaction[] = await this.transactionsRepo.findByAndCriteria(
      {
        owner: user,
        range: {
          field: 'datetime',
          from: payload.dateStart,
          to: payload.dateEnd,
        },
      },
    );
    this.transactionInputPort.setTransactions(transactions);
    return this.transactionInputPort.getTransactionsCountForDateRange(
      new Date(payload.dateStart),
      new Date(payload.dateEnd),
    );
  }

  @Get('/report/sum-by-range')
  async getTransactionsSumForDateRange(
    @User() user: IUser,
    @Query() payload: TransactionsDateRangeDto,
  ): Promise<any> {
    const [baseCurrency, transactions] = await Promise.all([
      this.currenciesFacade.findByCode('UAH'),
      this.transactionsRepo.findByAndCriteria({
        owner: user,
        range: {
          field: 'datetime',
          from: payload.dateStart,
          to: payload.dateEnd,
        },
      }),
    ]);
    this.transactionInputPort.setTransactions(transactions);
    return this.transactionInputPort.getTransactionsSumForDateRange(
      new Date(payload.dateStart),
      new Date(payload.dateEnd),
      baseCurrency,
    );
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('/report/count-ratio')
  async getTransactionCountRatioByCategories(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    try {
      const [baseCategory, transactions]: [
        ITransactionCategory,
        ITransaction[],
      ] = await Promise.all([
        this.transactionCategoriesFacade.findById(payload.categoryId),
        this.transactionsRepo.findByAndCriteria({
          owner: user,
          range: {
            field: 'datetime',
            from: payload.dateStart,
            to: payload.dateEnd,
          },
        }),
      ]);
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionCountRatioByCategories(
        baseCategory,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('/report/sum-ratio')
  async getTransactionSumRatioByCategories(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    try {
      const [baseCurrency, baseCategory, transactions]: [
        ICurrency,
        ITransactionCategory,
        ITransaction[],
      ] = await Promise.all([
        this.currenciesFacade.findByCode('UAH'),
        this.transactionCategoriesFacade.findById(payload.categoryId),
        this.transactionsRepo.findByAndCriteria({
          owner: user,
          range: {
            field: 'datetime',
            from: payload.dateStart,
            to: payload.dateEnd,
          },
        }),
      ]);
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionSumRatioByCategories(
        baseCategory,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
        baseCurrency,
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('/report/count-change')
  async getTransactionCountChangeByPeriod(
    @User() user: IUser,
    @Query() payload: TransactionsRangeDto,
  ): Promise<any> {
    try {
      const [baseCategory, transactions]: [
        ITransactionCategory,
        ITransaction[],
      ] = await Promise.all([
        this.transactionCategoriesFacade.findById(payload.categoryId),
        this.transactionsRepo.findByAndCriteria({
          owner: user,
          range: {
            field: 'datetime',
            from: payload.dateStart,
            to: payload.dateEnd,
          },
        }),
      ]);
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionCountChangeByPeriod(
        baseCategory,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
        payload.by,
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Transaction category id is invalid',
    },
  })
  @Get('/report/sum-change')
  async getTransactionSumChangeByPeriod(
    @User() user: IUser,
    @Query() payload: TransactionsRangeDto,
  ): Promise<any> {
    try {
      const [baseCurrency, baseCategory, transactions]: [
        ICurrency,
        ITransactionCategory,
        ITransaction[],
      ] = await Promise.all([
        this.currenciesFacade.findByCode('UAH'),
        this.transactionCategoriesFacade.findById(payload.categoryId),
        this.transactionsRepo.findByAndCriteria({
          owner: user,
          range: {
            field: 'datetime',
            from: payload.dateStart,
            to: payload.dateEnd,
          },
        }),
      ]);
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionSumChangeByPeriod(
        baseCategory,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
        payload.by,
        baseCurrency,
      );
    } catch (e) {
      throw new BadRequestException('Transaction category id is invalid');
    }
  }

  @Get('/:id')
  getTransactionDetail(
    @User() user: IUser,
    @Param('id') id: string,
  ): Promise<any> {
    return this.transactionInputPort.getTransactionDetail(user, id);
  }
}
