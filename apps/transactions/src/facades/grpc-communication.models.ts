import { Observable } from 'rxjs/internal/Observable';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ICurrency from '@domain/currencies/entities/currency.interface';

export interface CategoryId {
  id: string;
}

export interface ITransactionCategoriesRemoteFacade {
  findById(data: CategoryId): Observable<ITransactionCategory>;
  getTransactionCategoryChildren(
    data: ITransactionCategory,
  ): Observable<{ result: ITransactionCategory[] }>;
  getTransactionCategoryDirectChildren(
    data: ITransactionCategory,
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
  findById(data: CurrencyId): Observable<ICurrency>;
  findByCode(data: CurrencyCode): Observable<ICurrency>;
  getRateFor(data: RateQuery): Observable<Rate>;
}
