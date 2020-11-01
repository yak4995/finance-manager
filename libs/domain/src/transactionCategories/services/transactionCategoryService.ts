import ITransactionCategory from '../entities/transactionCategory.interface';
import IRepository from '../../repository.interface';

export default class TransactionCategoryService {
  constructor(
    private readonly transactionCategoryRepository: IRepository<
      ITransactionCategory
    >,
  ) {}

  public async getTransactionCategoryChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    let currentCategories: ITransactionCategory[] = [parentCategory];
    let nextIterationCategories: ITransactionCategory[] = [];
    const result: ITransactionCategory[] = [];
    while (currentCategories.length > 0) {
      for (let currentCategory of currentCategories) {
        const currentCategoryChildren: ITransactionCategory[] = await this.transactionCategoryRepository.findByAndCriteria(
          {
            parentCategory: currentCategory,
          },
        );
        nextIterationCategories.push(...currentCategoryChildren);
        result.push(currentCategory);
      }
      currentCategories = [...nextIterationCategories];
      nextIterationCategories = [];
    }
    return result;
  }

  public getTransactionCategoryDirectChildren(
    parentCategory: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    return this.transactionCategoryRepository.findByAndCriteria({
      parentCategory,
    });
  }
}
