import { Criteria } from '../../repository.interface';
import ITransactionCategory from '../entities/transactionCategory.interface';

// Probably children: TypeOrmTransactionCategoryCreator, MongoTransactionCategoryObjectCreator, XMLTransactionCategoryCreator
export default interface ITransactionCategoryCreator {
  getInstance(fields: Criteria<ITransactionCategory>): ITransactionCategory;
}
