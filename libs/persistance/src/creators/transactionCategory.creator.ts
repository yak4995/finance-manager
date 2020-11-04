import EntityCreator from '@domain/entityCreator.interface';
import { Criteria } from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';

import { Injectable } from '@nestjs/common';

@Injectable()
export default class TransactionCategoryCreator
  implements EntityCreator<ITransactionCategory> {
  public getInstance(
    fields: Criteria<ITransactionCategory>,
  ): ITransactionCategory {
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
