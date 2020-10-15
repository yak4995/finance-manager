import TransactionCategoryAbstractFactory from '../../../domain/transactionCategories/factories/transactionCategoryFactory';
import ITransactionCategory from '../../../domain/transactionCategories/entities/transactionCategory.interface';
import EntityCreator from '../../../domain/entityCreator.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';
import FakeRepo from '../../../domain/test/mocks/fakeRepo';

/* istanbul ignore next */
export default class FakeTransactionCategoryFactory extends TransactionCategoryAbstractFactory {
  constructor(
    private readonly transactionCategories: ITransactionCategory[],
    transactionsCreator: EntityCreator<ITransactionCategory>,
  ) {
    super(transactionsCreator);
  }
  createTransactionCategory(
    fields: Criteria<ITransactionCategory>,
  ): ITransactionCategory {
    return super.createTransactionCategory(fields);
  }
  createTransactionCategoryRepo(): IRepository<ITransactionCategory> {
    return new FakeRepo<ITransactionCategory>(this.transactionCategories);
  }
}
