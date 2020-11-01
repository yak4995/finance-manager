import ICurrency from '@domain/currencies/entities/currency.interface';
import EntityCreator from '@domain/entityCreator.interface';
import { Criteria } from '@domain/repository.interface';

import { Injectable } from '@nestjs/common';

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
