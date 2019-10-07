import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import { TransactionDto } from '../dto/transaction.dto';
import { OrderCriteria } from '../../../domain/repository.interface';
import IUser from '../../../domain/users/entities/user.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';

export default interface TransactionManagementInputPort {
  getTransactionDetail(id: string): Promise<void>;
  getTransactions(
    user: IUser,
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<void>;
  getTransactionsByCategory(
    user: IUser,
    category: ITransactionCategory,
  ): Promise<void>;
  search(user: IUser, content: string): Promise<void>;
  addTransaction(payload: TransactionDto): Promise<void>;
  updateTransaction(
    transaction: ITransaction,
    payload: TransactionDto,
  ): Promise<void>;
  deleteTransaction(transaction: ITransaction): Promise<void>;
}
