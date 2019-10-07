import IUser from '../../users/entities/user.interface';
import IPersistantEntity from '../../persistantEntity';

// Probably children: TypeOrmTransactionCategoryEntity, MongooseTransactionCategorySchema, XMLTransactionCategoryEntity
export default interface ITransactionCategory extends IPersistantEntity {
  name: string;
  parentCategory: ITransactionCategory | null;
  owner: IUser | null;
  isSystem: boolean;
  isOutcome: boolean;
}
