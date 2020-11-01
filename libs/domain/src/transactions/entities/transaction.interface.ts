import IUser from '../../users/entities/user.interface';
import ITransactionCategory from '../../transactionCategories/entities/transactionCategory.interface';
import ICurrency from '../../currencies/entities/currency.interface';
import IPersistantEntity from '../../persistantEntity';

// Probably children: TypeOrmTransactionEntity, MongooseTransactionSchema, XMLTransactionEntity
export default interface ITransaction extends IPersistantEntity {
  datetime: Date;
  description?: string;
  amount: number; // integer: count of cents or another minimal currency unit
  owner: IUser;
  transactionCategory: ITransactionCategory;
  currency: ICurrency;
}
