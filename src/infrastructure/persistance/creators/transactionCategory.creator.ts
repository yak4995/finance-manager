import { Injectable } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import { Criteria } from '../../../core/domain/repository.interface';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';

@Injectable()
export default class TransactionCategoryCreator
  implements EntityCreator<ITransactionCategory> {
  getInstance(fields: Criteria<ITransactionCategory>): ITransactionCategory {
    return {
      id: fields.id ?? 'fakeId',
      name: fields.name ?? 'test',
      isOutcome: fields.isOutcome ?? true,
      isSystem: fields.isSystem ?? true,
      owner: fields.owner ?? null,
      parentCategory: fields.parentCategory ?? null,
    };
  }
}
