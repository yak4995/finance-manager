import IRepository from '../../../core/domain/repository.interface';
import ITransactionCategory from '../../../core/domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryService from '../../../core/domain/transactionCategories/services/transactionCategoryService';
import ITransactionCategoriesFacade from '../../../core/domain/transactionCategories/transactionCategories.facade';
import { Injectable } from '@nestjs/common';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactionCategories/factories/transactionCategoryFactory';

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
