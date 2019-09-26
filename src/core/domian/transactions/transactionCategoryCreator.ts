import { Criteria } from '../repository.interface';
import ITransactionCategory from './transactionCategory.interface';

export default interface ITransactionCategoryCreator {
  getInstance(fields: Criteria<ITransactionCategory>): ITransactionCategory;
}
