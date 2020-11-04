import ICurrency from '@domain/currencies/entities/currency.interface';
import { Period } from '@domain/period/enums/period.enum';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';

export default interface TransactionAnalyticInputPort {
  setTransactions(transactions: ITransaction[]): void;

  getTransactionsCountBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any>;

  getTransactionsSumBy(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any>;

  getTransactionsCountForDateRange(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any>;

  getTransactionsSumForDateRange(
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any>;

  getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<any>;

  getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    baseCurrency: ICurrency,
  ): Promise<any>;

  getTransactionCountChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
  ): Promise<any>;

  getTransactionSumChangeByPeriod(
    category: ITransactionCategory,
    dateStart: Date,
    dateEnd: Date,
    by: Period,
    baseCurrency: ICurrency,
  ): Promise<any>;
}