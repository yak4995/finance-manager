import TransactionManagementInputPort from '../ports/transactionManagementInput.port';
import TransactionAnalyticInputPort from '../ports/transactionAnalyticInput.port';
import ITransactionDto from '../dto/iTransaction.dto';
import TransactionOutputPort from '../ports/transactionOutput.port';
import ISearchService from '../../search/searchService.interface';

import IRepository, { OrderCriteria } from '@domain/repository.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';
import TransactionAbstractFactory from '@domain/transactions/factories/transactionFactory';
import ITransactionCategoriesFacade from '@domain/transactionCategories/transactionCategories.facade';
import ICurrenciesFacade from '@domain/currencies/currencies.facade';
import TransactionAnalyticService from '@domain/transactions/services/transactionAnalyticService';
import IUser from '@domain/users/entities/user.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ICurrency from '@domain/currencies/entities/currency.interface';
import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';
import { Period } from '@domain/period/enums/period.enum';

export default class TransactionInteractor
  implements TransactionAnalyticInputPort, TransactionManagementInputPort {
  private readonly transactionRepo: IRepository<ITransaction>;

  constructor(
    private readonly transactionFactory: TransactionAbstractFactory,
    private readonly transactionCategoriesFacade: ITransactionCategoriesFacade,
    private readonly currenciesFacade: ICurrenciesFacade,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly searchService: ISearchService<ITransaction>,
    private readonly transactionOutputPort: TransactionOutputPort,
  ) {
    this.transactionRepo = this.transactionFactory.createTransactionRepo();
  }

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
        await this.transactionCategoriesFacade.getTransactionCategoryChildren(
          category,
        )
      ).map((c: ITransactionCategory): string => c.id);
      const transactions: ITransaction[] = (
        await this.transactionRepo.findByAndCriteria({
          owner: user,
          range: {
            from: dateStart,
            to: dateEnd,
            field: 'datetime',
          },
        })
      ).filter((t: ITransaction): boolean =>
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
        this.transactionCategoriesFacade.findById(
          payload.transactionCategoryId,
        ),
        this.currenciesFacade.findById(payload.currencyId),
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
      await this.searchService.insert(result);
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
        this.transactionCategoriesFacade.findById(
          payload.transactionCategoryId,
        ),
        this.currenciesFacade.findById(payload.currencyId),
      ]);
      if (transaction.owner.id !== user.id) {
        throw new Error('This user is not owner of this transaction');
      }
      await this.searchService.remove(transaction);
      await Promise.all([
        this.transactionRepo.update(
          {
            datetime: payload.datetime,
            transactionCategory,
            amount: payload.amount,
            currency,
            description: payload.description,
          },
          transaction.id,
        ),
        this.searchService.insert(
          Object.assign({}, transaction, {
            datetime: payload.datetime,
            transactionCategory,
            amount: payload.amount,
            currency,
            description: payload.description,
          }),
        ),
      ]);
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
      await Promise.all([
        this.transactionRepo.delete({ id: transaction.id }),
        this.searchService.remove(transaction),
      ]);
      return this.transactionOutputPort.deleteTransaction(transaction, null);
    } catch (e) {
      return this.transactionOutputPort.deleteTransaction(null, e);
    }
  }

  public async getMaxTransactionByCategory(
    category: ITransactionCategory,
  ): Promise<ITransaction> {
    try {
      const result: ITransaction = await this.transactionAnalyticService.getMaxTransactionByCategory(
        category,
      );
      return this.transactionOutputPort.getMaxTransactionByCategory(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getMaxTransactionByCategory(null, e);
    }
  }

  public async getMinTransactionByCategory(
    category: ITransactionCategory,
  ): Promise<ITransaction> {
    try {
      const result: ITransaction = await this.transactionAnalyticService.getMinTransactionByCategory(
        category,
      );
      return this.transactionOutputPort.getMinTransactionByCategory(
        result,
        null,
      );
    } catch (e) {
      return this.transactionOutputPort.getMinTransactionByCategory(null, e);
    }
  }

  public async getTransactionsCountBy(
    category: ITransactionCategory,
  ): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsCountBy(
        category,
      );
      return this.transactionOutputPort.getTransactionsCountBy(result, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsCountBy(null, e);
    }
  }

  public async getTransactionsSumBy(
    category: ITransactionCategory,
    baseCurrency: ICurrency,
  ): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsSumBy(
        category,
        baseCurrency,
      );
      return this.transactionOutputPort.getTransactionsSumBy(result, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsSumBy(null, e);
    }
  }

  public async getTransactionsCount(): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsCount();
      return this.transactionOutputPort.getTransactionsCount(result, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsCount(null, e);
    }
  }

  public async getTransactionsSum(baseCurrency: ICurrency): Promise<any> {
    try {
      const result: number = await this.transactionAnalyticService.getTransactionsSum(
        baseCurrency,
      );
      return this.transactionOutputPort.getTransactionsSum(result, null);
    } catch (e) {
      return this.transactionOutputPort.getTransactionsSum(null, e);
    }
  }

  public async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
  ): Promise<any> {
    try {
      const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionCountRatioByCategories(
        baseCategory,
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
    baseCurrency: ICurrency,
  ): Promise<any> {
    try {
      const result: TransactionsComparisonDto = await this.transactionAnalyticService.getTransactionSumRatioByCategories(
        baseCategory,
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
