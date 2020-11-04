import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import ICurrenciesFacade from '@domain/currencies/currencies.facade';
import ICurrency from '@domain/currencies/entities/currency.interface';

import { ICurrenciesRemoteFacade } from './grpc-communication.models';

@Injectable()
export class CurrenciesFacade implements ICurrenciesFacade {
  private currenciesFacade: ICurrenciesRemoteFacade;

  constructor(
    @Inject('CURRENCIES_SERVICE')
    private readonly _client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.currenciesFacade = this._client.getService<ICurrenciesRemoteFacade>(
      'CurrenciesFacade',
    );
  }

  findById(id: string): Promise<ICurrency> {
    return this.currenciesFacade.findById({ id }).toPromise();
  }

  findByCode(code: string): Promise<ICurrency> {
    return this.currenciesFacade.findByCode({ code }).toPromise();
  }

  getRateFor(from: string, to: string, forDate: number): Promise<number> {
    return this.currenciesFacade
      .getRateFor({ from, to, forDate })
      .toPromise()
      .then(rate => rate.rate);
  }
}
