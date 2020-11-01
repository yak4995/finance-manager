import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';
import ITransaction from '@domain/transactions/entities/transaction.interface';

export default interface TransactionOutputPort {
  getTransactionDetail(result: ITransaction, e: Error): Promise<any>;
  getTransactions(result: ITransaction[], e: Error): Promise<any>;
  getTransactionsByCategory(result: ITransaction[], e: Error): Promise<any>;
  search(result: ITransaction[], e: Error): Promise<any>;
  addTransaction(result: ITransaction, e: Error): Promise<any>;
  updateTransaction(result: ITransaction, e: Error): Promise<ITransaction>;
  deleteTransaction(transaction: ITransaction, e: Error): Promise<any>;
  getTransactionsCountBy(result: number, e: Error): Promise<any>;
  getTransactionsSumBy(result: number, e: Error): Promise<any>;
  getTransactionsCountForDateRange(result: number, e: Error): Promise<any>;
  getTransactionsSumForDateRange(result: number, e: Error): Promise<any>;
  getTransactionCountRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any>;
  getTransactionSumRatioByCategories(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any>;
  getTransactionCountChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any>;
  getTransactionSumChangeByPeriod(
    result: TransactionsComparisonDto,
    e: Error,
  ): Promise<any>;
}
