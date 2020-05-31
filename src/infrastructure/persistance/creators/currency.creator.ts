import { Injectable } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import { Criteria } from '../../../core/domain/repository.interface';

@Injectable()
export default class CurrencyCreator implements EntityCreator<ICurrency> {
  public getInstance(fields: Criteria<ICurrency>): ICurrency {
    return {
      id: fields.id ?? 'fakeId',
      name: fields.name ?? 'test',
      code: fields.code ?? 'test',
    };
  }
}
