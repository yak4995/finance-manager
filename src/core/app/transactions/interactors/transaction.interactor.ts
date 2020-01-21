import TransactionManagementInputPort from '../ports/transactionManagementInput.port';
import TransactionAnalyticInputPort from '../ports/transactionAnalyticInput.port';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import IRepository, {
  OrderCriteria,
} from '../../../domain/repository.interface';
import { TransactionDto } from '../dto/transaction.dto';
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

export default class TransactionInteractor
  implements TransactionAnalyticInputPort, TransactionManagementInputPort {
  constructor(
    private readonly user: IUser,
    private readonly transactionFactory: TransactionAbstractFactory,
    private readonly transactionCategoryService: TransactionCategoryService,
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly transactionRepo: IRepository<ITransaction>,
    private readonly currencyRepo: IRepository<ICurrency>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly searchService: ISearchService<ITransaction>,
    private readonly transactionOutputPort: TransactionOutputPort,
  ) {}

  async getTransactionDetail(id: string): Promise<any> {
    try {
      const transaction: ITransaction = await this.transactionRepo.findById(id);
      return this.transactionOutputPort.getTransactionDetail(transaction, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionDetail(null, e);
    }
  }

  async getTransactions(
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<any> {
    try {
      const transactions: ITransaction[] = await this.transactionRepo.findAll(
        page,
        perPage,
        order,
        { owner: this.user },
      );
      return this.transactionOutputPort.getTransactions(transactions, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactions(null, e);
    }
  }

  async getTransactionsByCategory(
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
          owner: this.user,
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

  async search(content: string): Promise<any> {
    try {
      const transactions: ITransaction[] = await this.searchService.search(
        content,
        'description',
      );
      return this.transactionOutputPort.search(
        transactions.filter(t => t.owner.id === this.user.id),
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.search(null, e);
    }
  }

  async addTransaction(payload: TransactionDto): Promise<any> {
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
          owner: this.user,
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

  async updateTransaction(
    transaction: ITransaction,
    payload: TransactionDto,
  ): Promise<any> {
    try {
      const [transactionCategory, currency]: [
        ITransactionCategory,
        ICurrency,
      ] = await Promise.all([
        this.transactionCategoryRepo.findById(payload.transactionCategoryId),
        this.currencyRepo.findById(payload.currencyId),
      ]);
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

  async deleteTransaction(transaction: ITransaction): Promise<any> {
    try {
      await this.transactionRepo.delete({ id: transaction.id });
      return this.transactionOutputPort.deleteTransaction(transaction, null);
    } catch (e) {
      return this.transactionOutputPort.deleteTransaction(null, e);
    }
  }

  async getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    const result: number = await this.transactionAnalyticService.getTransactionsCountBy(
      category,
      dateStart,
      dateEnd,
    );
    return this.transactionOutputPort.getTransactionsCountBy(result, null);
  }

  async getTransactionsSumBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any> {
    const result: number = await this.transactionAnalyticService.getTransactionsSumBy(
      category,
      dateStart,
      dateEnd,
      baseCurrency,
    );
    return this.transactionOutputPort.getTransactionsSumBy(result, null);
  }

  async getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    const result: number = await this.transactionAnalyticService.getTransactionsCountForDateRange(
      dateStart,
      dateEnd,
    );
    return this.transactionOutputPort.getTransactionsCountForDateRange(
      result,
      null,
    );
  }

  async getTransactionsSumForDateRange(
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any> {
    const result: number = await this.transactionAnalyticService.getTransactionsSumForDateRange(
      dateStart,
      dateEnd,
      baseCurrency,
    );
    return this.transactionOutputPort.getTransactionsSumForDateRange(
      result,
      null,
    );
  }

  async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionCountRatioByCategories(
      baseCategory,
      dateStart,
      dateEnd,
    );
    return this.transactionOutputPort.getTransactionCountRatioByCategories(
      result,
      null,
    );
  }

  async getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any> {
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
  }

  async getTransactionCountChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Promise<any> {
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
  }

  async getTransactionSumChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    baseCurrency: ICurrency,
  ): Promise<any> {
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
  }
}
