import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as cls from 'cls-hooked';
import { Metadata } from 'grpc';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import ITransactionCategoriesFacade from '@domain/transactionCategories/transactionCategories.facade';

import { ITransactionCategoriesRemoteFacade } from './grpc-communication.models';

@Injectable()
export class TransactionCategoriesFacade
  implements ITransactionCategoriesFacade {
  private transactionCategoriesFacade: ITransactionCategoriesRemoteFacade;

  constructor(
    @Inject('CATEGORIES_SERVICE')
    private readonly _client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.transactionCategoriesFacade = this._client.getService<
      ITransactionCategoriesRemoteFacade
    >('CategoriesFacade');
  }

  getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    const metadata = new Metadata();
    metadata.set(
      'requestId',
      (
        cls.getNamespace('transactions') ?? {
          get: (_: string) => 'not provided',
        }
      ).get('requestId'),
    );
    return this.transactionCategoriesFacade
      .getTransactionCategoryChildren(parentCategory, metadata)
      .toPromise()
      .then(result => result.result)
      .catch(e => {
        throw e;
      });
  }

  getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    const metadata = new Metadata();
    metadata.set(
      'requestId',
      (
        cls.getNamespace('transactions') ?? {
          get: (_: string) => 'not provided',
        }
      ).get('requestId'),
    );
    return this.transactionCategoriesFacade
      .getTransactionCategoryDirectChildren(parentCategory, metadata)
      .toPromise()
      .then(result => result.result)
      .catch(e => {
        throw e;
      });
  }

  findById(id: string): Promise<ITransactionCategory> {
    const metadata = new Metadata();
    metadata.set(
      'requestId',
      (
        cls.getNamespace('transactions') ?? {
          get: (_: string) => 'not provided',
        }
      ).get('requestId'),
    );
    return this.transactionCategoriesFacade
      .findById({ id }, metadata)
      .toPromise()
      .catch(e => {
        throw e;
      });
  }
}
