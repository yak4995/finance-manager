import ICurrency from '@domain/currencies/entities/currency.interface';
import { Period } from '@domain/period/enums/period.enum';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';

export default interface TransactionAnalyticInputPort {
  setTransactions(transactions: ITransaction[]): void;

  getMaxTransactionByCategory(
    category: ITransactionCategory,
  ): Promise<ITransaction>;

  getMinTransactionByCategory(
    category: ITransactionCategory,
  ): Promise<ITransaction>;

  getTransactionsCountBy(category: ITransactionCategory): Promise<any>;

  getTransactionsSumBy(
    category: ITransactionCategory,
    baseCurrency: ICurrency,
  ): Promise<any>;

  getTransactionsCount(): Promise<any>;

  getTransactionsSum(baseCurrency: ICurrency): Promise<any>;

  getTransactionCountRatioByCategories(
    baseCategory: ITransactionCategory,
  ): Promise<any>;

  getTransactionSumRatioByCategories(
    baseCategory: ITransactionCategory,
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
