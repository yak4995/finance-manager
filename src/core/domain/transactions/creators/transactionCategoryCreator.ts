import { Criteria } from '../../repository.interface';
import ITransactionCategory from '../entities/transactionCategory.interface';

export default interface ITransactionCategoryCreator {
  getInstance(fields: Criteria<ITransactionCategory>): ITransactionCategory;
}
