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
import {
  INCORRECT_PAGE_PARAM_MSG,
  INVALID_TOKEN_MSG,
  INVALID_USER_MSG,
  TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
  TRANSACTION_IS_NOT_FOUND_MSG,
  USER_IS_NOT_ACTIVE_MSG,
} from '@common/constants/errorMessages.constants';

@ApiBearerAuth()
@ApiTags('Transaction management')
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
      example: INCORRECT_PAGE_PARAM_MSG,
    },
  })
  @Get('/')
  getTransactions(
    @User() user: IUser,
    @Query() payload: PaginationDto,
  ): Promise<any> {
    if (Number(payload.page) < 1 || Number(payload.perPage) < 1) {
      throw new BadRequestException(INCORRECT_PAGE_PARAM_MSG);
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
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
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
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
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
      example: TRANSACTION_IS_NOT_FOUND_MSG,
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
      throw new BadRequestException(TRANSACTION_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_IS_NOT_FOUND_MSG,
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
      throw new BadRequestException(TRANSACTION_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Get('report/max')
  public async getMaxTransactionByCategory(
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
      return this.transactionInputPort.getMaxTransactionByCategory(category);
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Get('report/min')
  public async getMinTransactionByCategory(
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
      return this.transactionInputPort.getMinTransactionByCategory(category);
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
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
      return this.transactionInputPort.getTransactionsCountBy(category);
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Get('/report/sum')
  async getTransactionsSumBy(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    let [baseCurrency, category, transactions]: [
      ICurrency,
      ITransactionCategory,
      ITransaction[],
    ] = [null, null, null];
    try {
      [baseCurrency, category, transactions] = await Promise.all([
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
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    if (category) {
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionsSumBy(
        category,
        baseCurrency,
      );
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
    return this.transactionInputPort.getTransactionsCount();
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
    return this.transactionInputPort.getTransactionsSum(baseCurrency);
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
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
      );
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Get('/report/sum-ratio')
  async getTransactionSumRatioByCategories(
    @User() user: IUser,
    @Query() payload: TransactionsCategoryRangeDto,
  ): Promise<any> {
    let [baseCurrency, baseCategory, transactions]: [
      ICurrency,
      ITransactionCategory,
      ITransaction[],
    ] = [null, null, null];
    try {
      [baseCurrency, baseCategory, transactions] = await Promise.all([
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
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    if (baseCategory) {
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionSumRatioByCategories(
        baseCategory,
        baseCurrency,
      );
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
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
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG,
    },
  })
  @Get('/report/sum-change')
  async getTransactionSumChangeByPeriod(
    @User() user: IUser,
    @Query() payload: TransactionsRangeDto,
  ): Promise<any> {
    let [baseCurrency, baseCategory, transactions]: [
      ICurrency,
      ITransactionCategory,
      ITransaction[],
    ] = [null, null, null];
    try {
      [baseCurrency, baseCategory, transactions] = await Promise.all([
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
    } catch (e) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    if (baseCategory) {
      this.transactionInputPort.setTransactions(transactions);
      return this.transactionInputPort.getTransactionSumChangeByPeriod(
        baseCategory,
        new Date(payload.dateStart),
        new Date(payload.dateEnd),
        payload.by,
        baseCurrency,
      );
    }
  }

  @Get('/:id')
  async getTransactionDetail(
    @User() user: IUser,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.transactionInputPort.getTransactionDetail(user, id);
    } catch (e) {
      throw new BadRequestException(TRANSACTION_IS_NOT_FOUND_MSG);
    }
  }
}
