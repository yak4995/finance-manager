import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import IUser from '@domain/users/entities/user.interface';

import ITransactionCategoryDto from '../../transactionCategories/dto/iTransactionCategory.dto';

export default interface TransactionCategoryInputPort {
  getTopCategories(user: IUser): Promise<any>;
  getCategoryDirectChildren(
    user: IUser,
    parentCategory: ITransactionCategory,
  ): Promise<any>;
  getOwnCategories(user: IUser): Promise<any>;
  search(user: IUser, content: string): Promise<any>;
  addCategory(user: IUser, payload: ITransactionCategoryDto): Promise<any>;
  updateCategory(
    category: ITransactionCategory,
    payload: ITransactionCategoryDto,
  ): Promise<any>;
  deleteCategory(category: ITransactionCategory): Promise<any>;
}
