import { Injectable, Inject } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import IRepository from '../../../core/domain/repository.interface';
import TransactionAbstractFactory from '../../../core/domain/transactions/factories/transactionFactory';
import ITransaction from '../../../core/domain/transactions/entities/transaction.interface';

@Injectable()
export default class TransactionFactory extends TransactionAbstractFactory {
  constructor(
    @Inject('TransactionRepositoryForFactory')
    private readonly transactionRepository: IRepository<ITransaction>,
    @Inject('TransactionCreator')
    transactionCreator: EntityCreator<ITransaction>,
  ) {
    super(transactionCreator);
  }

  public createTransactionRepo(): IRepository<ITransaction> {
    return this.transactionRepository;
  }
}
