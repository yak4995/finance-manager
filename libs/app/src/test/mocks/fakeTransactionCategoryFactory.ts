import EntityCreator from '../../../../domain/src/entityCreator.interface';
import IRepository, {
  Criteria,
} from '../../../../domain/src/repository.interface';
import FakeRepo from '../../../../domain/src/test/mocks/fakeRepo';
import ITransactionCategory from '../../../../domain/src/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../../../domain/src/transactionCategories/factories/transactionCategoryFactory';

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
