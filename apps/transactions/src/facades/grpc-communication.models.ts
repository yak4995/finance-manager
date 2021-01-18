import { Observable } from 'rxjs/internal/Observable';
import { Metadata } from 'grpc';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ICurrency from '@domain/currencies/entities/currency.interface';

export interface CategoryId {
  id: string;
}

export interface ITransactionCategoriesRemoteFacade {
  findById(
    data: CategoryId,
    metadata?: Metadata,
  ): Observable<ITransactionCategory>;
  getTransactionCategoryChildren(
    data: ITransactionCategory,
    metadata?: Metadata,
  ): Observable<{ result: ITransactionCategory[] }>;
  getTransactionCategoryDirectChildren(
    data: ITransactionCategory,
    metadata?: Metadata,
  ): Observable<{ result: ITransactionCategory[] }>;
}

export interface CurrencyId {
  id: string;
}

export interface CurrencyCode {
  code: string;
}

export interface RateQuery {
  from: string;
  to: string;
  forDate: number;
}

export interface Rate {
  rate: number;
}

export interface ICurrenciesRemoteFacade {
  findById(data: CurrencyId, metadata?: Metadata): Observable<ICurrency>;
  findByCode(data: CurrencyCode, metadata?: Metadata): Observable<ICurrency>;
  getRateFor(data: RateQuery, metadata?: Metadata): Observable<Rate>;
}
