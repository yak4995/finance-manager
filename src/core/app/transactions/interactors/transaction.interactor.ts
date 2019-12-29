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
import EntityFactory from '../../entityFactory';
import TransactionAnalyticService from '../../../domain/transactions/services/transactionAnalyticService';
import TransactionOutputPort from '../ports/transactionOutput.port';
import ISearchService from '../../search/searchService.interface';
import TransactionCategoryService from '../../../domain/transactions/services/transactionCategoryService';
import { TransactionsComparisonDto } from '../../../../core/domain/transactions/dto/transactionsComparison.dto';

export default class TransactionInteractor
  implements TransactionAnalyticInputPort, TransactionManagementInputPort {
  constructor(
    private readonly user: IUser,
    private readonly entityFactory: EntityFactory,
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
      return this.transactionOutputPort.getTransactionDetail(transaction);
    } catch (e) {
      return this.transactionOutputPort.getTransactionDetail(null);
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
      return this.transactionOutputPort.getTransactions(transactions);
    } catch (e) {
      return this.transactionOutputPort.getTransactions(null);
    }
  }

  async getTransactionsByCategory(
    dateStart: Date,
    dateEnd: Date,
    category: ITransactionCategory,
  ): Promise<any> {
    try {
      const categoryIds: string[] = (await this.transactionCategoryService.getTransactionCategoryChildren(
        category,
      )).map((c: ITransactionCategory): string => c.id);
      const transactions: ITransaction[] = (await this.transactionRepo.findByAndCriteria(
        {
          owner: this.user,
        },
      )).filter(
        (t: ITransaction): boolean =>
          t.datetime >= dateStart &&
          t.datetime <= dateEnd &&
          categoryIds.includes(t.transactionCategory.id),
      );
      return this.transactionOutputPort.getTransactionsByCategory(transactions);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsByCategory(null);
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
      );
    } catch (e) {
      return this.transactionOutputPort.search(null);
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
      const createdTransaction: ITransaction = this.entityFactory.createTransaction(
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
      return this.transactionOutputPort.addTransaction(result);
    } catch (e) {
      return this.transactionOutputPort.addTransaction(null);
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
      const result = await this.transactionRepo.update(
        {
          datetime: payload.datetime,
          transactionCategory,
          amount: payload.amount,
          currency,
          description: payload.description,
        },
        transaction.id,
      );
      return this.transactionOutputPort.updateTransaction(result);
    } catch (e) {
      return this.transactionOutputPort.updateTransaction(null);
    }
  }

  async deleteTransaction(transaction: ITransaction): Promise<any> {
    try {
      await this.transactionRepo.delete({ id: transaction.id });
      return this.transactionOutputPort.deleteTransaction(transaction);
    } catch (e) {
      return this.transactionOutputPort.deleteTransaction(null);
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
    return this.transactionOutputPort.getTransactionsCountBy(result);
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
    return this.transactionOutputPort.getTransactionsSumBy(result);
  }

  async getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any> {
    const result: number = await this.transactionAnalyticService.getTransactionsCountForDateRange(
      dateStart,
      dateEnd,
    );
    return this.transactionOutputPort.getTransactionsCountForDateRange(result);
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
    return this.transactionOutputPort.getTransactionsSumForDateRange(result);
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
    return this.transactionOutputPort.getTransactionCountChangeByPeriod(result);
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
    return this.transactionOutputPort.getTransactionSumChangeByPeriod(result);
  }
}
