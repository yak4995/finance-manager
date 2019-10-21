import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import TransactionCategoryDto from '../dto/transactionCategory.dto';
import IUser from '../../../domain/users/entities/user.interface';

export default interface TransactionCategoryInputPort {
  getTopCategories(user: IUser): Promise<void>;
  getCategoryDirectChildren(
    user: IUser,
    parentCategory: ITransactionCategory,
  ): Promise<void>;
  getOwnCategories(user: IUser): Promise<void>;
  search(user: IUser, content: string): Promise<void>;
  addCategory(user: IUser, payload: TransactionCategoryDto): Promise<void>;
  updateCategory(
    category: ITransactionCategory,
    payload: TransactionCategoryDto,
  ): Promise<void>;
  deleteCategory(category: ITransactionCategory): Promise<void>;
}
