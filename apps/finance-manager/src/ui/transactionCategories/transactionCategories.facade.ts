import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';
import TransactionCategoryService from '@domain/transactionCategories/services/transactionCategoryService';
import ITransactionCategoriesFacade from '@domain/transactionCategories/transactionCategories.facade';

import { Injectable } from '@nestjs/common';

// TODO: make singleton?
@Injectable()
export class TransactionCategoriesFacade
  implements ITransactionCategoriesFacade {
  private readonly transactionCategoriesRepo: IRepository<ITransactionCategory>;

  constructor(
    private readonly transactionCategoryService: TransactionCategoryService,
    transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {
    this.transactionCategoriesRepo = transactionCategoryFactory.createTransactionCategoryRepo();
  }

  public getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    return this.transactionCategoryService.getTransactionCategoryChildren(
      parentCategory,
    );
  }

  public getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    return this.transactionCategoryService.getTransactionCategoryDirectChildren(
      parentCategory,
    );
  }

  public findById(id: string): Promise<ITransactionCategory> {
    return this.transactionCategoriesRepo.findById(id);
  }
}
