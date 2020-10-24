import * as moment from 'moment';
import ITransaction from '../entities/transaction.interface';
import ITransactionCategory from '../../transactionCategories/entities/transactionCategory.interface';
import ICurrency from '../../currencies/entities/currency.interface';
import ICurrencyConverterService from '../../currencies/services/currencyConverterService.interface';
import { Period } from '../../period/enums/period.enum';
import { TransactionsComparisonDto } from '../dto/transactionsComparison.dto';
import { InvalidDateRangeException } from '../exceptions/invalidDateRange.exception';
import ITransactionCategoriesFacade from '../../transactionCategories/transactionCategories.facade';

export default class TransactionAnalyticService {
  constructor(
    private _transactions: ITransaction[],
    private readonly converter: ICurrencyConverterService,
    private readonly transactionCategoriesFacade: ITransactionCategoriesFacade,
  ) {}

  get transactions(): ITransaction[] {
    return this._transactions;
  }

  set transactions(transactions: ITransaction[]) {
    this._transactions = transactions;
  }

  public async getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<number> {
    return (
      await this.getTransactionsByFilter({
        category,
        dateStart,
        dateEnd,
      })
    ).length;
  }

  public async getTransactionsSumBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<number> {
    return this.getSumByTransactions(
      await this.getTransactionsByFilter({ category, dateStart, dateEnd }),
      baseCurrency,
    );
  }

  public async getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<number> {
    return (await this.getTransactionsByFilter({ dateStart, dateEnd })).length;
  }

  public async getTransactionsSumForDateRange(
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<number> {
    return this.getSumByTransactions(
      await this.getTransactionsByFilter({ dateStart, dateEnd }),
      baseCurrency,
    );
  }

  // pie diagramm data for transactions structure
  public async getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<TransactionsComparisonDto> {
    return this.processTransactionRatioByCategory(
      baseCategory,
      dateStart,
      dateEnd,
      async (arg: ITransaction[]): Promise<number> => arg.length,
    );
  }

  public async getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<TransactionsComparisonDto> {
    return this.processTransactionRatioByCategory(
      baseCategory,
      dateStart,
      dateEnd,
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
    dateStart: Date;
    dateEnd: Date;
    category?: ITransactionCategory;
    categories?: ITransactionCategory[];
  }): Promise<ITransaction[]> {
    const result: ITransaction[] = this.transactions.filter(
      (t: ITransaction): boolean =>
        t.datetime >= filter.dateStart && t.datetime <= filter.dateEnd,
    );
    if (filter.category) {
      const categoryChildrenIds: string[] = (
        await this.transactionCategoriesFacade.getTransactionCategoryChildren(
          filter.category,
        )
      ).map((childCategory: ITransactionCategory): string => childCategory.id);
      return result.filter((t: ITransaction): boolean =>
        categoryChildrenIds.includes(t.transactionCategory.id),
      );
    }
    if (filter.categories) {
      return result.filter((t: ITransaction): boolean =>
        filter.categories
          .map((tc: ITransactionCategory): string => tc.id)
          .includes(t.transactionCategory.id),
      );
    }
    return result;
  }

  private async getSumByTransactions(
    transactions: ITransaction[],
    baseCurrency: ICurrency,
  ): Promise<number> {
    const preparedTransactionsValues: number[] = [];
    for (const transaction of transactions) {
      const rate = await this.converter.getRateFor(
        transaction.currency.code,
        baseCurrency.code,
        new Date(),
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
    dateStart: Date,
    dateEnd: Date,
    processFunction: (transactions: ITransaction[]) => Promise<number>,
  ): Promise<TransactionsComparisonDto> {
    const directChildren: ITransactionCategory[] = await this.transactionCategoriesFacade.getTransactionCategoryDirectChildren(
      baseCategory,
    );
    let general: number = 0;
    const result: TransactionsComparisonDto = {};
    for (const childCategory of directChildren) {
      const transactionsForProcessing: ITransaction[] = await this.getTransactionsByFilter(
        {
          dateStart,
          dateEnd,
          category: childCategory,
        },
      );
      const tempResult: number = await processFunction(
        transactionsForProcessing,
      );
      general += tempResult;
      result[childCategory.id] = tempResult;
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
        dateStart,
        dateEnd,
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
      const currentEndDate: moment.Moment = preparedDateStart;
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
