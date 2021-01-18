import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from 'grpc';
import * as cls from 'cls-hooked';

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
    const metadata = new Metadata();
    metadata.set(
      'requestId',
      (
        cls.getNamespace('transactions') ?? {
          get: (_: string) => 'not provided',
        }
      ).get('requestId'),
    );
    return this.currenciesFacade
      .findById({ id }, metadata)
      .toPromise()
      .catch(e => {
        throw e;
      });
  }

  findByCode(code: string): Promise<ICurrency> {
    const metadata = new Metadata();
    metadata.set(
      'requestId',
      (
        cls.getNamespace('transactions') ?? {
          get: (_: string) => 'not provided',
        }
      ).get('requestId'),
    );
    return this.currenciesFacade
      .findByCode({ code }, metadata)
      .toPromise()
      .catch(e => {
        throw e;
      });
  }

  getRateFor(from: string, to: string, forDate: number): Promise<number> {
    const metadata = new Metadata();
    metadata.set(
      'requestId',
      (
        cls.getNamespace('transactions') ?? {
          get: (_: string) => 'not provided',
        }
      ).get('requestId'),
    );
    return this.currenciesFacade
      .getRateFor({ from, to, forDate }, metadata)
      .toPromise()
      .then(rate => rate.rate)
      .catch(e => {
        throw e;
      });
  }
}
