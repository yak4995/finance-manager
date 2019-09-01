import { Dinero as Money } from 'dinero.js';
import { IUser } from '../../users/domain/user.interface';
import { ITransactionCategory } from './transactionCategory.interface';

export interface ITransaction {
  getDatetime(): Date;
  getAmount(): Money;
  getOwner(): IUser;
  getTransactionCategory(): ITransactionCategory;
  setDatetime(transactionDatetime: Date): this;
  setAmount(amount: Money): this;
  setOwner(owner: IUser): this;
  setTransactionCategory(category: ITransactionCategory): this;
}
