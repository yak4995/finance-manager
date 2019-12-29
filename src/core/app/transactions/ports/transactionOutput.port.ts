import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default interface TransactionOutputPort {
  getTransactionDetail(result: ITransaction): Promise<any>;
  getTransactions(result: ITransaction[]): Promise<any>;
  getTransactionsByCategory(result: ITransaction[]): Promise<any>;
  search(result: ITransaction[]): Promise<any>;
  addTransaction(result: ITransaction): Promise<any>;
  updateTransaction(result: any): Promise<any>;
  deleteTransaction(transaction: ITransaction): Promise<any>;
  getTransactionsCountBy(result: number): Promise<any>;
  getTransactionsSumBy(result: number): Promise<any>;
  getTransactionsCountForDateRange(result: number): Promise<any>;
  getTransactionsSumForDateRange(result: number): Promise<any>;
  getTransactionCountRatioByCategories(
    result: TransactionsComparisonDto,
  ): Promise<any>;
  getTransactionSumRatioByCategories(
    result: TransactionsComparisonDto,
  ): Promise<any>;
  getTransactionCountChangeByPeriod(
    result: TransactionsComparisonDto,
  ): Promise<any>;
  getTransactionSumChangeByPeriod(
    result: TransactionsComparisonDto,
  ): Promise<any>;
}
