import EntityCreator from '@domain/entityCreator.interface';
import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export default class TransactionCategoryFactory extends TransactionCategoryAbstractFactory {
  constructor(
    @Inject('TransactionCategoryRepositoryForFactory')
    private readonly transactionCategoryRepository: IRepository<
      ITransactionCategory
    >,
    @Inject('TransactionCategoryCreator')
    transactionCategoryCreator: EntityCreator<ITransactionCategory>,
  ) {
    super(transactionCategoryCreator);
  }

  public createTransactionCategoryRepo(): IRepository<ITransactionCategory> {
    return this.transactionCategoryRepository;
  }
}
