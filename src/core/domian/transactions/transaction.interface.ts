import IUser from '../users/user.interface';
import ITransactionCategory from './transactionCategory.interface';
import ICurrency from './currency.interface';
import IPersistantEntity from '../persistantEntity';

export default interface ITransaction extends IPersistantEntity {
  datetime: Date;
  amount: number; // integer: count of cents or another minimal currency unit
  owner: IUser;
  transactionCategory: ITransactionCategory;
  currency: ICurrency;
}
