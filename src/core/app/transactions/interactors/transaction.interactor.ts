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

export class TransactionInteractor
  implements TransactionAnalyticInputPort, TransactionManagementInputPort {
  constructor(
    private readonly entityFactory: EntityFactory,
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly transactionRepo: IRepository<ITransaction>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly searchService: ISearchService<ITransaction>,
    private readonly transactionOutputPort: TransactionOutputPort,
  ) {}

  async getTransactionDetail(id: string): Promise<void> {
    await this.transactionOutputPort.getTransactionDetail(null);
  }

  async getTransactions(
    user: IUser,
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactions([]);
  }

  async getTransactionsByCategory(
    user: IUser,
    category: ITransactionCategory,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionsByCategory([]);
  }

  async search(user: IUser, content: string): Promise<void> {
    await this.transactionOutputPort.search([]);
  }

  async addTransaction(payload: TransactionDto): Promise<void> {
    await this.transactionOutputPort.addTransaction(null);
  }

  async updateTransaction(
    transaction: ITransaction,
    payload: TransactionDto,
  ): Promise<void> {
    await this.transactionOutputPort.updateTransaction(transaction);
  }

  async deleteTransaction(transaction: ITransaction): Promise<void> {
    await this.transactionOutputPort.deleteTransaction(transaction);
  }

  async getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionsCountBy(0);
  }

  async getTransactionsSumBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionsSumBy(0);
  }

  async getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionsCountForDateRange(0);
  }

  async getTransactionsSumForDateRange(
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionsSumForDateRange(0);
  }

  async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionCountRatioByCategories({});
  }

  async getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionSumRatioByCategories({});
  }

  async getTransactionCountChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionCountChangeByPeriod({});
  }

  async getTransactionSumChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    baseCurrency: ICurrency,
  ): Promise<void> {
    await this.transactionOutputPort.getTransactionSumChangeByPeriod({});
  }
}
