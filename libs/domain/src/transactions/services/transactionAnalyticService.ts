import * as moment from 'moment';

import ITransaction from '../entities/transaction.interface';
import ITransactionCategory from '../../transactionCategories/entities/transactionCategory.interface';
import ICurrency from '../../currencies/entities/currency.interface';
import { Period } from '../../period/enums/period.enum';
import { TransactionsComparisonDto } from '../dto/transactionsComparison.dto';
import { InvalidDateRangeException } from '../exceptions/invalidDateRange.exception';
import ITransactionCategoriesFacade from '../../transactionCategories/transactionCategories.facade';

import ICurrenciesFacade from '@domain/currencies/currencies.facade';

export default class TransactionAnalyticService {
  constructor(
    private _transactions: ITransaction[],
    private readonly currenciesFacade: ICurrenciesFacade,
    private readonly transactionCategoriesFacade: ITransactionCategoriesFacade,
  ) {}

  get transactions(): ITransaction[] {
    return this._transactions;
  }

  set transactions(transactions: ITransaction[]) {
    this._transactions = transactions;
  }

  public async getMaxTransactionByCategory(
    category: ITransactionCategory,
  ): Promise<ITransaction> {
    const maxAmount: number = Math.max(
      ...(await this.getTransactionsByFilter({ category })).map(t => t.amount),
    );
    return this.transactions.find(t => t.amount === maxAmount);
  }

  public async getMinTransactionByCategory(
    category: ITransactionCategory,
  ): Promise<ITransaction> {
    const minAmount: number = Math.min(
      ...(await this.getTransactionsByFilter({ category })).map(t => t.amount),
    );
    return this.transactions.find(t => t.amount === minAmount);
  }

  public async getTransactionsCountBy(
    category: ITransactionCategory,
  ): Promise<number> {
    return (await this.getTransactionsByFilter({ category })).length;
  }

  public async getTransactionsSumBy(
    category: ITransactionCategory,
    baseCurrency: ICurrency,
  ): Promise<number> {
    return this.getSumByTransactions(
      await this.getTransactionsByFilter({ category }),
      baseCurrency,
    );
  }

  public async getTransactionsCount(): Promise<number> {
    return (await this.getTransactionsByFilter({})).length;
  }

  public async getTransactionsSum(baseCurrency: ICurrency): Promise<number> {
    return this.getSumByTransactions(
      await this.getTransactionsByFilter({}),
      baseCurrency,
    );
  }

  // pie diagramm data for transactions structure
  public async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
  ): Promise<TransactionsComparisonDto> {
    return this.processTransactionRatioByCategory(
      baseCategory,
      async (arg: ITransaction[]): Promise<number> => arg.length,
    );
  }

  public async getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    baseCurrency: ICurrency,
  ): Promise<TransactionsComparisonDto> {
    return this.processTransactionRatioByCategory(
      baseCategory,
      async (arg: ITransaction[]): Promise<number> =>
        await this.getSumByTransactions(arg, baseCurrency),
    );
  }

  // line chart diagramm data for transactions dynamic by time
  public async getTransactionCountChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Promise<TransactionsComparisonDto> {
    return this.processTransactionsChangeByPeriod(
      category,
      dateStart,
      dateEnd,
      by,
      async (arg: ITransaction[]): Promise<number> => arg.length,
    );
  }

  public async getTransactionSumChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    baseCurrency: ICurrency,
  ): Promise<TransactionsComparisonDto> {
    return this.processTransactionsChangeByPeriod(
      category,
      dateStart,
      dateEnd,
      by,
      async (arg: ITransaction[]): Promise<number> =>
        await this.getSumByTransactions(arg, baseCurrency),
    );
  }

  private async getTransactionsByFilter(filter: {
    category?: ITransactionCategory;
    categories?: ITransactionCategory[];
  }): Promise<ITransaction[]> {
    if (filter.category) {
      const categoryChildrenIds: string[] = (
        await this.transactionCategoriesFacade.getTransactionCategoryChildren(
          filter.category,
        )
      ).map((childCategory: ITransactionCategory): string => childCategory.id);
      return this.transactions.filter((t: ITransaction): boolean =>
        categoryChildrenIds.includes(t.transactionCategory.id),
      );
    }
    if (filter.categories) {
      return this.transactions.filter((t: ITransaction): boolean =>
        filter.categories
          .map((tc: ITransactionCategory): string => tc.id)
          .includes(t.transactionCategory.id),
      );
    }
    return this.transactions;
  }

  private async getSumByTransactions(
    transactions: ITransaction[],
    baseCurrency: ICurrency,
  ): Promise<number> {
    const preparedTransactionsValues: number[] = [];
    for (const transaction of transactions) {
      const rate = await this.currenciesFacade.getRateFor(
        transaction.currency.code,
        baseCurrency.code,
        new Date().getTime(),
      );
      preparedTransactionsValues.push(rate * transaction.amount);
    }
    return preparedTransactionsValues.reduce(
      (sum: number, amount: number): number => sum + amount,
      0,
    );
  }

  private async processTransactionRatioByCategory(
    baseCategory: ITransactionCategory,
    processFunction: (transactions: ITransaction[]) => Promise<number>,
  ): Promise<TransactionsComparisonDto> {
    const directChildren: ITransactionCategory[] = await this.transactionCategoriesFacade.getTransactionCategoryDirectChildren(
      baseCategory,
    );
    let general: number = 0;
    const result: TransactionsComparisonDto = {};
    for (const category of [baseCategory].concat(directChildren ?? [])) {
      const transactionsForProcessing: ITransaction[] = await this.getTransactionsByFilter(
        { category },
      );
      const tempResult: number = await processFunction(
        transactionsForProcessing,
      );
      general += tempResult;
      result[category.id] = tempResult;
    }
    for (const categoryId in result) {
      result[categoryId] =
        general !== 0 ? Math.round((result[categoryId] * 100) / general) : 0;
    }
    return result;
  }

  private checkDateRangeForDynamicAnalytics(
    dateStart: Date,
    dateEnd: Date,
    period: Period,
  ): void {
    const preparedDateStart: moment.Moment = moment(dateStart);
    const preparedDateEnd: moment.Moment = moment(dateEnd);
    const periodsToDiffUnitsMap: moment.unitOfTime.Diff[] = [
      'months',
      'quarters',
      'years',
    ];
    if (
      preparedDateEnd.diff(preparedDateStart, periodsToDiffUnitsMap[period]) < 1
    ) {
      throw new InvalidDateRangeException(
        "'by' period is less than date range",
      );
    }
  }

  private async processTransactionsChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    processFunction: (transactions: ITransaction[]) => Promise<number>,
  ): Promise<TransactionsComparisonDto> {
    try {
      this.checkDateRangeForDynamicAnalytics(dateStart, dateEnd, by);
    } catch (e) {
      throw e;
    }
    const transactionsForProcessing: ITransaction[] = await this.getTransactionsByFilter(
      {
        categories: await this.transactionCategoriesFacade.getTransactionCategoryChildren(
          category,
        ),
      },
    );
    const result: TransactionsComparisonDto = {};
    for (const [
      currentStartDate,
      currentEndDate,
    ] of TransactionAnalyticService.dateRangeGenerator(
      dateStart,
      dateEnd,
      by,
    )) {
      result[currentStartDate.toLocaleDateString()] = await processFunction(
        transactionsForProcessing.filter(
          t => t.datetime >= currentStartDate && t.datetime <= currentEndDate,
        ),
      );
    }
    return result;
  }

  private static *dateRangeGenerator(
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Generator<[Date, Date]> {
    let preparedDateStart: moment.Moment = moment(dateStart);
    let preparedDateEnd: moment.Moment = moment(dateEnd);
    while (preparedDateStart < preparedDateEnd) {
      const currentEndDate: moment.Moment = moment(preparedDateStart);
      switch (by) {
        case Period.MONTH:
          currentEndDate.add(1, 'day');
          break;
        case Period.QUARTER:
          currentEndDate.add(1, 'month');
          break;
        case Period.YEAR:
          currentEndDate.add(3, 'months');
          break;
      }
      yield [preparedDateStart.toDate(), currentEndDate.toDate()];
      preparedDateStart = currentEndDate;
    }
  }
}
