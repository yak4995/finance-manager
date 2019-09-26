import ITransactionCategory from '../transactionCategory.interface';
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
    let currentCategories = [parentCategory];
    let nextIterationCategories = [];
    const result = [];
    while (currentCategories.length > 0) {
      for (let i = 0; i < currentCategories.length; i++) {
        const currentCategory = currentCategories[i];
        const currentCategoryChildren = await this.transactionCategoryRepository.findByAndCriteria(
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

  public async getTransactionCategorySiblings(
    category: ITransactionCategory,
  ): Promise<ITransactionCategory[]> {
    return this.transactionCategoryRepository.findByAndCriteria({
      parentCategory: category.parentCategory,
    });
  }
}
