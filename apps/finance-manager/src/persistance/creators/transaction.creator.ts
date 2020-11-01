import EntityCreator from '@domain/entityCreator.interface';
import { Criteria } from '@domain/repository.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';

import { Injectable } from '@nestjs/common';

@Injectable()
export default class TransactionCreator implements EntityCreator<ITransaction> {
  public getInstance(fields: Criteria<ITransaction>): ITransaction {
    if (!fields.currency) {
      throw new Error('currency field in transaction creator is undefined');
    }
    if (!fields.owner) {
      throw new Error('owner field in transaction creator is undefined');
    }
    if (!fields.transactionCategory) {
      throw new Error(
        'transactionCategory field in transaction creator is undefined',
      );
    }
    return {
      id: fields.id ?? 'id',
      description: fields.description ?? '',
      currency: fields.currency,
      datetime: fields.datetime ?? new Date(),
      amount: fields.amount ?? 0,
      owner: fields.owner,
      transactionCategory: fields.transactionCategory,
    };
  }
}
