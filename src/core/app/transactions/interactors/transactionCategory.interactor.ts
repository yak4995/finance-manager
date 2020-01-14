import TransactionCategoryInputPort from '../ports/transactionCategotyInput.port';
import IRepository from '../../../domain/repository.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import EntityFactory from '../../entityFactory';
import IUser from '../../../domain/users/entities/user.interface';
import TransactionCategoryDto from '../dto/transactionCategory.dto';
import TransactionCategoryOutputPort from '../ports/transactionCategoryOutput.port';
import ISearchService from '../../search/searchService.interface';

export default class TransactionCategoryInteractor
  implements TransactionCategoryInputPort {
  constructor(
    private readonly entityFactory: EntityFactory,
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly searchService: ISearchService<ITransactionCategory>,
    private readonly transactionCategoryOutputPort: TransactionCategoryOutputPort,
  ) {}

  async getTopCategories(user: IUser): Promise<any> {
    const [ownTopCategories, systemTopCategories]: [
      ITransactionCategory[],
      ITransactionCategory[],
    ] = await Promise.all([
      this.transactionCategoryRepo.findByAndCriteria({
        isSystem: false,
        parentCategory: null,
        owner: user,
      }),
      this.transactionCategoryRepo.findByAndCriteria({
        isSystem: true,
        parentCategory: null,
        owner: null,
      }),
    ]);
    return this.transactionCategoryOutputPort.getTopCategories(
      [...ownTopCategories, ...systemTopCategories],
      null,
    );
  }

  async getCategoryDirectChildren(
    user: IUser,
    parentCategory: ITransactionCategory,
  ): Promise<any> {
    const [systemCategories, ownCategories]: [
      ITransactionCategory[],
      ITransactionCategory[],
    ] = await Promise.all([
      this.transactionCategoryRepo.findByAndCriteria({
        parentCategory,
        isSystem: true,
        owner: null,
      }),
      this.transactionCategoryRepo.findByAndCriteria({
        parentCategory,
        isSystem: false,
        owner: user,
      }),
    ]);
    return this.transactionCategoryOutputPort.getCategoryDirectChildren(
      [...systemCategories, ...ownCategories],
      null,
    );
  }

  async getOwnCategories(user: IUser): Promise<any> {
    const result: ITransactionCategory[] = await this.transactionCategoryRepo.findByAndCriteria(
      {
        owner: user,
        isSystem: false,
      },
    );
    return this.transactionCategoryOutputPort.getOwnCategories(result, null);
  }

  async search(user: IUser, content: string): Promise<any> {
    const result: ITransactionCategory[] = (
      await this.searchService.search(content, 'name')
    ).filter((c: ITransactionCategory): boolean => c.owner.id !== user.id);
    return this.transactionCategoryOutputPort.search(result, null);
  }

  async addCategory(
    user: IUser,
    payload: TransactionCategoryDto,
  ): Promise<any> {
    try {
      const parentCategory: ITransactionCategory = await this.transactionCategoryRepo.findById(
        payload.parentCategoryId,
      );
      if (parentCategory.isOutcome !== payload.isOutcome) {
        throw new Error('isOutcome field is common for all category tree');
      }
      const createdCategory: ITransactionCategory = this.entityFactory.createTransactionCategory(
        {
          name: payload.name,
          parentCategory,
          owner: user,
          isOutcome: payload.isOutcome,
          isSystem: false,
        },
      );
      const result: ITransactionCategory = await this.transactionCategoryRepo.insert(
        createdCategory,
      );
      return this.transactionCategoryOutputPort.addCategory(result, null);
    } catch (e) {
      return this.transactionCategoryOutputPort.addCategory(null, e);
    }
  }

  async updateCategory(
    category: ITransactionCategory,
    payload: TransactionCategoryDto,
  ): Promise<any> {
    try {
      const parentCategory: ITransactionCategory = await this.transactionCategoryRepo.findById(
        payload.parentCategoryId,
      );
      if (parentCategory.isOutcome !== payload.isOutcome) {
        throw new Error('isOutcome field is common for all category tree');
      }
      await this.transactionCategoryRepo.update(
        {
          name: payload.name,
          isOutcome: payload.isOutcome,
          parentCategory,
        },
        category.id,
      );
      return this.transactionCategoryOutputPort.updateCategory(
        Object.assign({}, category, {
          name: payload.name,
          isOutcome: payload.isOutcome,
        }),
        null,
      );
    } catch (e) {
      return this.transactionCategoryOutputPort.updateCategory(null, e);
    }
  }

  async deleteCategory(category: ITransactionCategory): Promise<any> {
    try {
      await this.transactionCategoryRepo.delete({ id: category.id });
      return this.transactionCategoryOutputPort.deleteCategory(category, null);
    } catch (e) {
      return this.transactionCategoryOutputPort.deleteCategory(null, e);
    }
  }
}
