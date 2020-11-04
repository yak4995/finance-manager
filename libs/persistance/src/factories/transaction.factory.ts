import EntityCreator from '@domain/entityCreator.interface';
import IRepository from '@domain/repository.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';
import TransactionAbstractFactory from '@domain/transactions/factories/transactionFactory';

import { Injectable, Inject } from '@nestjs/common';

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
