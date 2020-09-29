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
  Logger,
} from '@nestjs/common';
import JwtAuthGuard from '../../../ui/auth/guards/jwt-auth.guard';
import { OnlyRoles } from '../../../decorators/roles.decorator';
import { Roles } from '../../../../core/app/users/enums/roles.enum';
import IRepository from '../../../../core/domain/repository.interface';
import ITransaction from '../../../../core/domain/transactions/entities/transaction.interface';
import TransactionManagementInputPort from '../../../../core/app/transactions/ports/transactionManagementInput.port';
import TransactionAnalyticInputPort from '../../../../core/app/transactions/ports/transactionAnalyticInput.port';
import TransactionAbstractFactory from '../../../../core/domain/transactions/factories/transactionFactory';
import ITransactionCategory from '../../../../core/domain/transactions/entities/transactionCategory.interface';
import ICurrency from '../../../../core/domain/transactions/entities/currency.interface';
import IUser from '../../../../core/domain/users/entities/user.interface';
import { User } from '../../../decorators/user.decorator';
import { PaginationDto } from '../dtos/pagination.dto';
import TransactionCategoryAbstractFactory from '../../../../core/domain/transactions/factories/transactionCategoryFactory';
import { TransactionsCategoryRangeDto } from '../dtos/transactionsCategoryRange.dto';
import { TransactionDto } from '../dtos/transaction.dto';
import CurrencyAbstractFactory from '../../../../core/domain/transactions/factories/currencyFactory';
import { TransactionsDateRangeDto } from '../dtos/transactionsDateRange.dto';
import { TransactionsRangeDto } from '../dtos/transactionsRange.dto';

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
  private readonly transactionCategoryRepo: IRepository<ITransactionCategory>;
  private readonly currencyRepo: IRepository<ICurrency>;

  constructor(
    @Inject('TransactionManagementInputPort & TransactionAnalyticInputPort')
    private readonly transactionInputPort: TransactionManagementInputPort &
      TransactionAnalyticInputPort,
    private readonly transactionFactory: TransactionAbstractFactory,
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
    private readonly currencyFactory: CurrencyAbstractFactory,
  ) {
    this.transactionsRepo = this.transactionFactory.createTransactionRepo();
    this.transactionCategoryRepo = this.transactionCategoryFactory.createTransactionCategoryRepo();
    this.currencyRepo = this.currencyFactory.createCurrencyRepo();
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
      const category: ITransactionCategory = await this.transactionCategoryRepo.findById(
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
        this.transactionCategoryRepo.findById(payload.categoryId),
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
        this.currencyRepo.findOneByAndCriteria({
          code: 'UAH',
        }),
        this.transactionCategoryRepo.findById(payload.categoryId),
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
      this.currencyRepo.findOneByAndCriteria({
        code: 'UAH',
      }),
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
        this.transactionCategoryRepo.findById(payload.categoryId),
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
        this.currencyRepo.findOneByAndCriteria({
          code: 'UAH',
        }),
        this.transactionCategoryRepo.findById(payload.categoryId),
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
        this.transactionCategoryRepo.findById(payload.categoryId),
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
        this.currencyRepo.findOneByAndCriteria({
          code: 'UAH',
        }),
        this.transactionCategoryRepo.findById(payload.categoryId),
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
