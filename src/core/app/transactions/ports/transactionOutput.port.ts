import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default interface TransactionOutputPort {
  getTransactionDetail(result: ITransaction): Promise<void>;
  getTransactions(result: ITransaction[]): Promise<void>;
  getTransactionsByCategory(result: ITransaction[]): Promise<void>;
  search(result: ITransaction[]): Promise<void>;
  addTransaction(result: ITransaction): Promise<void>;
  updateTransaction(result: ITransaction): Promise<void>;
  deleteTransaction(transaction: ITransaction): Promise<void>;
  getTransactionsCountBy(result: number): Promise<void>;
  getTransactionsSumBy(result: number): Promise<void>;
  getTransactionsCountForDateRange(result: number): Promise<void>;
  getTransactionsSumForDateRange(result: number): Promise<void>;
  getTransactionCountRatioByCategories(
    result: TransactionsComparisonDto,
  ): Promise<void>;
  getTransactionSumRatioByCategories(
    result: TransactionsComparisonDto,
  ): Promise<void>;
  getTransactionCountChangeByPeriod(
    result: TransactionsComparisonDto,
  ): Promise<void>;
  getTransactionSumChangeByPeriod(
    result: TransactionsComparisonDto,
  ): Promise<void>;
}
