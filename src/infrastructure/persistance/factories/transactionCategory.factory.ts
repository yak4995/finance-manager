import { Injectable, Inject } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import IRepository from '../../../core/domain/repository.interface';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';

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
