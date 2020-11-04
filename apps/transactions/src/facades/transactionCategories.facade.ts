import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

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
    return this.transactionCategoriesFacade
      .getTransactionCategoryChildren(parentCategory)
      .toPromise()
      .then(result => result.result);
  }

  getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    return this.transactionCategoriesFacade
      .getTransactionCategoryDirectChildren(parentCategory)
      .toPromise()
      .then(result => result.result);
  }

  findById(id: string): Promise<ITransactionCategory> {
    return this.transactionCategoriesFacade.findById({ id }).toPromise();
  }
}
