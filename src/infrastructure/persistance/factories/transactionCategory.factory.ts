import { Injectable, Inject } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import IRepository from '../../../core/domain/repository.interface';
import ITransactionCategory from '../../../core/domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactionCategories/factories/transactionCategoryFactory';

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
