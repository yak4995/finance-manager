import IEventListener from '../../../../core/app/events/eventListener.interface';
import IRepository from '../../../../core/domain/repository.interface';
import TransactionCategoryShouldBeDeletedEvent from '../events/transactionCategoryShouldBeDeleted.event';
import ITransactionCategory from '../../../../core/domain/transactions/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../../../core/domain/transactions/factories/transactionCategoryFactory';

export default class TransactionCategoryShouldBeDeletedListener
  implements IEventListener<TransactionCategoryShouldBeDeletedEvent> {
  private readonly transactionCategoryRepo: IRepository<ITransactionCategory>;
  constructor(
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {
    this.transactionCategoryRepo = transactionCategoryFactory.createTransactionCategoryRepo();
  }

  async process(
    event: TransactionCategoryShouldBeDeletedEvent,
  ): Promise<ITransactionCategory> {
    const result: ITransactionCategory[] = await this.transactionCategoryRepo.delete(
      {
        id: event.category.id,
      },
    );
    return result[0];
  }
}
