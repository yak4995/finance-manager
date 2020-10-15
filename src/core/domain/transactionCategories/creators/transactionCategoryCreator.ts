import { Criteria } from '../../repository.interface';
import ITransactionCategory from '../entities/transactionCategory.interface';
import EntityCreator from '../../entityCreator.interface';

// Probably children: TypeOrmTransactionCategoryCreator, MongoTransactionCategoryObjectCreator, XMLTransactionCategoryCreator
export default interface ITransactionCategoryCreator
  extends EntityCreator<ITransactionCategory> {
  getInstance(fields: Criteria<ITransactionCategory>): ITransactionCategory;
}
