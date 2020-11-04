import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import ICurrenciesFacade from '@domain/currencies/currencies.facade';
import ICurrency from '@domain/currencies/entities/currency.interface';
import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';
import IRepository from '@domain/repository.interface';

import { grpcClientOptions } from './grpcClient.options';
import { RateQuery } from './dto/rateQuery';
import CurrencyConverterService from './services/currencyConverter.service';
import { CurrencyId } from './dto/currencyId';
import { CurrencyCode } from './dto/currencyCode';
import { Rate } from './dto/rate';

interface ICurrenciesRemoteFacade {
  findById(data: CurrencyId): Observable<ICurrency>;
  findByCode(data: CurrencyCode): Observable<ICurrency>;
  getRateFor(data: RateQuery): Observable<Rate>;
}

// TODO: make singleton?
@Controller()
export class CurrenciesFacade implements ICurrenciesFacade {
  @Client(grpcClientOptions)
  private readonly _client: ClientGrpc;
  private remoteFacade: ICurrenciesRemoteFacade;
  private readonly currenciesRepo: IRepository<ICurrency>;

  constructor(
    currencyFactory: CurrencyAbstractFactory,
    private readonly currencyConverterService: CurrencyConverterService,
  ) {
    this.currenciesRepo = currencyFactory.createCurrencyRepo();
  }

  onModuleInit() {
    this.remoteFacade = this._client.getService<ICurrenciesRemoteFacade>(
      'CurrenciesFacade',
    );
  }

  @GrpcMethod('CurrenciesFacade', 'findById')
  @UsePipes(ValidationPipe)
  public findById(data: CurrencyId): Promise<ICurrency> {
    return this.currenciesRepo.findById(data.id);
  }

  @GrpcMethod('CurrenciesFacade', 'findByCode')
  @UsePipes(ValidationPipe)
  public findByCode(data: CurrencyCode): Promise<ICurrency> {
    return this.currenciesRepo.findOneByAndCriteria({ code: data.code });
  }

  @GrpcMethod('CurrenciesFacade', 'getRateFor')
  @UsePipes(ValidationPipe)
  public getRateFor(data: RateQuery): Promise<void | Rate> {
    return this.currencyConverterService
      .getRateFor(data.from, data.to, new Date(data.forDate))
      .then(rate => ({
        rate,
      }));
  }
}
