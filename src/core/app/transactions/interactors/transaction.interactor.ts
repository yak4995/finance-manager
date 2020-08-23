import TransactionManagementInputPort from '../ports/transactionManagementInput.port';
import TransactionAnalyticInputPort from '../ports/transactionAnalyticInput.port';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import IRepository, {
  OrderCriteria,
} from '../../../domain/repository.interface';
import ITransactionDto from '../dto/iTransaction.dto';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import ICurrency from '../../../domain/transactions/entities/currency.interface';
import IUser from '../../../domain/users/entities/user.interface';
import { Period } from '../../../domain/period/enums/period.enum';
import TransactionAnalyticService from '../../../domain/transactions/services/transactionAnalyticService';
import TransactionOutputPort from '../ports/transactionOutput.port';
import ISearchService from '../../search/searchService.interface';
import TransactionCategoryService from '../../../domain/transactions/services/transactionCategoryService';
import { TransactionsComparisonDto } from '../../../../core/domain/transactions/dto/transactionsComparison.dto';
import TransactionAbstractFactory from '../../../domain/transactions/factories/transactionFactory';
import { BadRequestException } from '@nestjs/common';

export default class TransactionInteractor
  implements TransactionAnalyticInputPort, TransactionManagementInputPort {
  constructor(
    private readonly transactionFactory: TransactionAbstractFactory,
    private readonly transactionCategoryService: TransactionCategoryService,
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly transactionRepo: IRepository<ITransaction>,
    private readonly currencyRepo: IRepository<ICurrency>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly searchService: ISearchService<ITransaction>,
    private readonly transactionOutputPort: TransactionOutputPort,
  ) {}

  public setTransactions(transactions: ITransaction[]): void {
    this.transactionAnalyticService.transactions = transactions;
  }

  public async getTransactionDetail(user: IUser, id: string): Promise<any> {
    try {
      const transaction: ITransaction = await this.transactionRepo.findOneByAndCriteria(
        { id, owner: user },
      );
      return this.transactionOutputPort.getTransactionDetail(transaction, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionDetail(null, e);
    }
  }

  public async getTransactions(
    user: IUser,
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<any> {
    try {
      const transactions: ITransaction[] = await this.transactionRepo.findAll(
        page,
        perPage,
        order,
        { owner: user },
      );
      return this.transactionOutputPort.getTransactions(transactions, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactions(null, e);
    }
  }

  public async getTransactionsByCategory(
    user: IUser,
    dateStart: Date,
    dateEnd: Date,
    category: ITransactionCategory,
  ): Promise<any> {
    try {
      const categoryIds: string[] = (
        await this.transactionCategoryService.getTransactionCategoryChildren(
          category,
        )
      ).map((c: ITransactionCategory): string => c.id);
      const transactions: ITransaction[] = (
        await this.transactionRepo.findByAndCriteria({
          owner: user,
        })
      ).filter(
        (t: ITransaction): boolean =>
          t.datetime >= dateStart &&
          t.datetime <= dateEnd &&
          categoryIds.includes(t.transactionCategory.id),
      );
      return this.transactionOutputPort.getTransactionsByCategory(
        transactions,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionsByCategory(null, e);
    }
  }

  public async search(user: IUser, content: string): Promise<any> {
    try {
      const transactions: ITransaction[] = await this.searchService.search(
        content,
        'description',
      );
      return this.transactionOutputPort.search(
        transactions.filter(t => t.owner.id === user.id),
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.search(null, e);
    }
  }

  public async addTransaction(
    user: IUser,
    payload: ITransactionDto,
  ): Promise<any> {
    try {
      const [transactionCategory, currency]: [
        ITransactionCategory,
        ICurrency,
      ] = await Promise.all([
        this.transactionCategoryRepo.findById(payload.transactionCategoryId),
        this.currencyRepo.findById(payload.currencyId),
      ]);
      const createdTransaction: ITransaction = this.transactionFactory.createTransaction(
        {
          datetime: payload.datetime,
          owner: user,
          transactionCategory,
          amount: payload.amount,
          currency,
          description: payload.description,
        },
      );
      const result: ITransaction = await this.transactionRepo.insert(
        createdTransaction,
      );
      return this.transactionOutputPort.addTransaction(result, null);
    } catch (e) {
      return this.transactionOutputPort.addTransaction(null, e);
    }
  }

  public async updateTransaction(
    user: IUser,
    transaction: ITransaction,
    payload: ITransactionDto,
  ): Promise<any> {
    try {
      const [transactionCategory, currency]: [
        ITransactionCategory,
        ICurrency,
      ] = await Promise.all([
        this.transactionCategoryRepo.findById(payload.transactionCategoryId),
        this.currencyRepo.findById(payload.currencyId),
      ]);
      if (transaction.owner.id !== user.id) {
        throw new BadRequestException(
          'This user is not owner of this transaction',
        );
      }
      await this.transactionRepo.update(
        {
          datetime: payload.datetime,
          transactionCategory,
          amount: payload.amount,
          currency,
          description: payload.description,
        },
        transaction.id,
      );
      return this.transactionOutputPort.updateTransaction(
        await this.transactionRepo.findById(transaction.id),
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.updateTransaction(null, e);
    }
  }

  public async deleteTransaction(
    user: IUser,
    transaction: ITransaction,
  ): Promise<any> {
    try {
      await this.transactionRepo.delete({ id: transaction.id, owner: user });
      return this.transactionOutputPort.deleteTransaction(transaction, null);
    } catch (e) {
      return this.transactionOutputPort.deleteTransaction(null, e);
    }
  }

  public async getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsCountBy(
        category,
        dateStart,
        dateEnd,
      );
      return this.transactionOutputPort.getTransactionsCountBy(result, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsCountBy(null, e);
    }
  }

  public async getTransactionsSumBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsSumBy(
        category,
        dateStart,
        dateEnd,
        baseCurrency,
      );
      return this.transactionOutputPort.getTransactionsSumBy(result, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsSumBy(null, e);
    }
  }

  public async getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsCountForDateRange(
        dateStart,
        dateEnd,
      );
      return this.transactionOutputPort.getTransactionsCountForDateRange(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionsCountForDateRange(
        null,
        e,
      );
    }
  }

  public async getTransactionsSumForDateRange(
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsSumForDateRange(
        dateStart,
        dateEnd,
        baseCurrency,
      );
      return this.transactionOutputPort.getTransactionsSumForDateRange(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionsSumForDateRange(null, e);
    }
  }

  public async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    try {
      const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionCountRatioByCategories(
        baseCategory,
        dateStart,
        dateEnd,
      );
      return this.transactionOutputPort.getTransactionCountRatioByCategories(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionCountRatioByCategories(
        null,
        e,
      );
    }
  }

  public async getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any> {
    try {
      const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionSumRatioByCategories(
        baseCategory,
        dateStart,
        dateEnd,
        baseCurrency,
      );
      return this.transactionOutputPort.getTransactionSumRatioByCategories(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionSumRatioByCategories(
        null,
        e,
      );
    }
  }

  public async getTransactionCountChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Promise<any> {
    try {
      const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionCountChangeByPeriod(
        category,
        dateStart,
        dateEnd,
        by,
      );
      return this.transactionOutputPort.getTransactionCountChangeByPeriod(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionCountChangeByPeriod(
        null,
        e,
      );
    }
  }

  public async getTransactionSumChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    baseCurrency: ICurrency,
  ): Promise<any> {
    try {
      const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionSumChangeByPeriod(
        category,
        dateStart,
        dateEnd,
        by,
        baseCurrency,
      );
      return this.transactionOutputPort.getTransactionSumChangeByPeriod(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getTransactionSumChangeByPeriod(
        null,
        e,
      );
    }
  }
}
