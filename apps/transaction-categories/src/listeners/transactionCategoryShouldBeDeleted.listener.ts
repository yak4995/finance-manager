import { Injectable } from '@nestjs/common';

import IEventListener from '@app/events/eventListener.interface';
import TransactionCategoryShouldBeDeletedEvent from '@app/events/transactionCategoryShouldBeDeleted.event';

import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';

@Injectable()
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
