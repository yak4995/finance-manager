import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import ITransactionDto from '../dto/iTransaction.dto';
import { OrderCriteria } from '../../../domain/repository.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import IUser from '../../../domain/users/entities/user.interface';

export default interface TransactionManagementInputPort {
  getTransactionDetail(user: IUser, id: string): Promise<any>;
  getTransactions(
    user: IUser,
    page: number,
    perPage: number,
    order: OrderCriteria<ITransaction>,
  ): Promise<any>;
  getTransactionsByCategory(
    user: IUser,
    dateStart: Date,
    dateEnd: Date,
    category: ITransactionCategory,
  ): Promise<any>;
  search(user: IUser, content: string): Promise<any>;
  addTransaction(user: IUser, payload: ITransactionDto): Promise<any>;
  updateTransaction(
    user: IUser,
    transaction: ITransaction,
    payload: ITransactionDto,
  ): Promise<any>;
  deleteTransaction(user: IUser, transaction: ITransaction): Promise<any>;
}
