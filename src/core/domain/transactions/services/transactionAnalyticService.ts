import * as moment from 'moment';
import ITransaction from '../entities/transaction.interface';
import ITransactionCategory from '../entities/transactionCategory.interface';
import ICurrency from '../entities/currency.interface';
import ICurrencyConverterService from './currencyConverterService.interface';
import { Period } from '../../period/enums/period.enum';
import { TransactionsComparisonDto } from '../dto/transactionsComparison.dto';
import TransactionCategoryService from './transactionCategoryService';
import { InvalidDateRangeException } from '../exceptions/invalidDateRange.exception';

export default class TransactionAnalyticService {
  constructor(
    private _transactions: ITransaction[],
    private readonly converter: ICurrencyConverterService,
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  get transactions(): ITransaction[] {
    return this._transactions;
  }

  set transactions(transactionsArray: ITransaction[]) {
    this._transactions = transactionsArray;
  }

  public async getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<number> {
    return (await this.getTransactionsByFilter({
      category,
      dateStart,
      dateEnd,
    })).length;
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
      arg => arg.length,
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
      arg => this.getSumByTransactions(arg, baseCurrency),
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
      arg => arg.length,
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
      arg => this.getSumByTransactions(arg, baseCurrency),
    );
  }

  private async getTransactionsByFilter(filter: {
    dateStart: Date;
    dateEnd: Date;
    category?: ITransactionCategory;
    categories?: ITransactionCategory[];
  }): Promise<ITransaction[]> {
    const result = this.transactions.filter(
      t => t.datetime >= filter.dateStart && t.datetime <= filter.dateEnd,
    );
    if (filter.category) {
      const categoryChildrenIds = (await this.transactionCategoryService.getTransactionCategoryChildren(
        filter.category,
      )).map(childCategory => childCategory.id);
      return result.filter(t =>
        categoryChildrenIds.includes(t.transactionCategory.id),
      );
    }
    if (filter.categories) {
      return result.filter(t =>
        filter.categories.map(tc => tc.id).includes(t.transactionCategory.id),
      );
    }
    return result;
  }

  private getSumByTransactions(
    transactions: ITransaction[],
    baseCurrency: ICurrency,
  ): number {
    return transactions
      .map(
        transaction =>
          this.converter.getRateFor(
            transaction.currency.code,
            baseCurrency.code,
            new Date(),
          ) * transaction.amount,
      )
      .reduce((sum, amount) => sum + amount, 0);
  }

  private async processTransactionRatioByCategory(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    processFunction: (transactions: ITransaction[]) => number,
  ): Promise<TransactionsComparisonDto> {
    const directChildren = await this.transactionCategoryService.getTransactionCategoryDirectChildren(
      baseCategory,
    );
    let general = 0;
    const result: TransactionsComparisonDto = {};
    for (const childCategory of directChildren) {
      const transactionsForProcessing = await this.getTransactionsByFilter({
        dateStart,
        dateEnd,
        categories: await this.transactionCategoryService.getTransactionCategoryChildren(
          childCategory,
        ),
      });
      general += processFunction(transactionsForProcessing);
      result[childCategory.id] = processFunction(transactionsForProcessing);
    }
    for (const categoryId in result) {
      result[categoryId] = Math.round((result[categoryId] * 100) / general);
    }
    return result;
  }

  private checkDateRangeForDynamicAnalytics(
    dateStart: Date,
    dateEnd: Date,
    period: Period,
  ): void {
    const preparedDateStart = moment(dateStart);
    const preparedDateEnd = moment(dateEnd);
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
    processFunction: (transactions: ITransaction[]) => number,
  ): Promise<TransactionsComparisonDto> {
    try {
      this.checkDateRangeForDynamicAnalytics(dateStart, dateEnd, by);
    } catch (e) {
      throw e;
    }
    const transactionsForProcessing = await this.getTransactionsByFilter({
      dateStart,
      dateEnd,
      categories: await this.transactionCategoryService.getTransactionCategoryChildren(
        category,
      ),
    });
    const result: TransactionsComparisonDto = {};
    for (const [
      currentStartDate,
      currentEndDate,
    ] of TransactionAnalyticService.dateRangeGenerator(
      dateStart,
      dateEnd,
      by,
    )) {
      result[currentStartDate.toLocaleDateString()] = processFunction(
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
  ) {
    while (dateStart < dateEnd) {
      const currentEndDate = new Date(dateStart);
      switch (by) {
        case Period.MONTH:
          if (currentEndDate.getMonth() < 11) {
            currentEndDate.setMonth(currentEndDate.getMonth() + 1);
          } else {
            currentEndDate.setMonth(0);
            currentEndDate.setFullYear(currentEndDate.getFullYear() + 1);
          }
          break;
        case Period.QUARTER:
          if (currentEndDate.getMonth() < 9) {
            currentEndDate.setMonth(currentEndDate.getMonth() + 3);
          } else {
            currentEndDate.setMonth(2);
            currentEndDate.setFullYear(currentEndDate.getFullYear() + 1);
          }
          break;
        case Period.YEAR:
          currentEndDate.setFullYear(currentEndDate.getFullYear() + 1);
          break;
      }
      yield [dateStart, currentEndDate];
      dateStart = currentEndDate;
    }
  }
}
