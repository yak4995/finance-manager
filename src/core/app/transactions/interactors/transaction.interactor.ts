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

  async getTransactionDetail(id: string): Promise<void> {
    try {
      const transaction = await this.transactionRepo.findById(id);
      await this.transactionOutputPort.getTransactionDetail(transaction);
    } catch (e) {
      await this.transactionOutputPort.getTransactionDetail(null);
    }
  }

  async getTransactions(
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<void> {
    try {
      const transactions = await this.transactionRepo.findAll(
        page,
        perPage,
        order,
        { owner: this.user },
      );
      await this.transactionOutputPort.getTransactions(transactions);
    } catch (e) {
      await this.transactionOutputPort.getTransactions(null);
    }
  }

  async getTransactionsByCategory(
    dateStart: Date,
    dateEnd: Date,
    category: ITransactionCategory,
  ): Promise<void> {
    try {
      const categories = (await this.transactionCategoryService.getTransactionCategoryChildren(
        category,
      )).map(c => c.id);
      const transactions = (await this.transactionRepo.findByAndCriteria({
        owner: this.user,
      })).filter(
        t =>
          t.datetime >= dateStart &&
          t.datetime <= dateEnd &&
          categories.includes(t.transactionCategory.id),
      );
      await this.transactionOutputPort.getTransactionsByCategory(transactions);
    } catch (e) {
      await this.transactionOutputPort.getTransactionsByCategory(null);
    }
  }

  async search(content: string): Promise<void> {
    try {
      const transactions = await this.searchService.search(
        content,
        'description',
      );
      await this.transactionOutputPort.search(
        transactions.filter(t => t.owner.id === this.user.id),
      );
    } catch (e) {
      await this.transactionOutputPort.search(null);
    }
  }

  async addTransaction(payload: TransactionDto): Promise<void> {
    try {
      const [transactionCategory, currency] = await Promise.all([
        this.transactionCategoryRepo.findById(payload.transactionCategoryId),
        this.currencyRepo.findById(payload.currencyId),
      ]);
      const createdTransaction = this.entityFactory.createTransaction({
        datetime: payload.datetime,
        owner: this.user,
        transactionCategory,
        amount: payload.amount,
        currency,
        description: payload.description,
      });
      const result = await this.transactionRepo.insert(createdTransaction);
      await this.transactionOutputPort.addTransaction(result);
    } catch (e) {
      await this.transactionOutputPort.addTransaction(null);
    }
  }

  async updateTransaction(
    transaction: ITransaction,
    payload: TransactionDto,
  ): Promise<void> {
    try {
      const [transactionCategory, currency] = await Promise.all([
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
      await this.transactionOutputPort.updateTransaction(result);
    } catch (e) {
      await this.transactionOutputPort.updateTransaction(null);
    }
  }

  async deleteTransaction(transaction: ITransaction): Promise<void> {
    try {
      await this.transactionRepo.delete({ id: transaction.id });
      await this.transactionOutputPort.deleteTransaction(transaction);
    } catch (e) {
      await this.transactionOutputPort.deleteTransaction(null);
    }
  }

  async getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionsCountBy(
      category,
      dateStart,
      dateEnd,
    );
    await this.transactionOutputPort.getTransactionsCountBy(result);
  }

  async getTransactionsSumBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionsSumBy(
      category,
      dateStart,
      dateEnd,
      baseCurrency,
    );
    await this.transactionOutputPort.getTransactionsSumBy(result);
  }

  async getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionsCountForDateRange(
      dateStart,
      dateEnd,
    );
    await this.transactionOutputPort.getTransactionsCountForDateRange(result);
  }

  async getTransactionsSumForDateRange(
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionsSumForDateRange(
      dateStart,
      dateEnd,
      baseCurrency,
    );
    await this.transactionOutputPort.getTransactionsSumForDateRange(result);
  }

  async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionCountRatioByCategories(
      baseCategory,
      dateStart,
      dateEnd,
    );
    await this.transactionOutputPort.getTransactionCountRatioByCategories(
      result,
    );
  }

  async getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionSumRatioByCategories(
      baseCategory,
      dateStart,
      dateEnd,
      baseCurrency,
    );
    await this.transactionOutputPort.getTransactionSumRatioByCategories(result);
  }

  async getTransactionCountChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionCountChangeByPeriod(
      category,
      dateStart,
      dateEnd,
      by,
    );
    await this.transactionOutputPort.getTransactionCountChangeByPeriod(result);
  }

  async getTransactionSumChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    baseCurrency: ICurrency,
  ): Promise<void> {
    const result = await this.transactionAnalyticService.getTransactionSumChangeByPeriod(
      category,
      dateStart,
      dateEnd,
      by,
      baseCurrency,
    );
    await this.transactionOutputPort.getTransactionSumChangeByPeriod(result);
  }
}
