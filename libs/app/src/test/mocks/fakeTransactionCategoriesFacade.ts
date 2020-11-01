import IRepository from '../../../../domain/src/repository.interface';
import ITransactionCategory from '../../../../domain/src/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '../../../../domain/src/transactionCategories/factories/transactionCategoryFactory';
import TransactionCategoryService from '../../../../domain/src/transactionCategories/services/transactionCategoryService';
import ITransactionCategoriesFacade from '../../../../domain/src/transactionCategories/transactionCategories.facade';

export default class FakeTransactionCategoriesFacade
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
