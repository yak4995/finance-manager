import TransactionCategoryInputPort from '../ports/transactionCategotyInput.port';
import IRepository from '../../../domain/repository.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import IUser from '../../../domain/users/entities/user.interface';
import ITransactionCategoryDto from '../dto/iTransactionCategory.dto';
import TransactionCategoryOutputPort from '../ports/transactionCategoryOutput.port';
import ISearchService from '../../search/searchService.interface';
import TransactionCategoryAbstractFactory from '../../../domain/transactions/factories/transactionCategoryFactory';

export default class TransactionCategoryInteractor
  implements TransactionCategoryInputPort {
  constructor(
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly searchService: ISearchService<ITransactionCategory>,
    private readonly transactionCategoryOutputPort: TransactionCategoryOutputPort,
  ) {}

  async getTopCategories(user: IUser): Promise<any> {
    try {
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
    } catch (e) {
      return this.transactionCategoryOutputPort.getTopCategories(null, e);
    }
  }

  async getCategoryDirectChildren(
    user: IUser,
    parentCategory: ITransactionCategory,
  ): Promise<any> {
    try {
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
    } catch (e) {
      return this.transactionCategoryOutputPort.getCategoryDirectChildren(
        null,
        e,
      );
    }
  }

  async getOwnCategories(user: IUser): Promise<any> {
    try {
      const result: ITransactionCategory[] = await this.transactionCategoryRepo.findByAndCriteria(
        {
          owner: user,
          isSystem: false,
        },
      );
      return this.transactionCategoryOutputPort.getOwnCategories(result, null);
    } catch (e) {
      return this.transactionCategoryOutputPort.getOwnCategories(null, e);
    }
  }

  async search(user: IUser, content: string): Promise<any> {
    try {
      const result: ITransactionCategory[] = (
        await this.searchService.search(content, 'name')
      ).filter((c: ITransactionCategory): boolean => c.owner.id !== user.id);
      return this.transactionCategoryOutputPort.search(result, null);
    } catch (e) {
      return this.transactionCategoryOutputPort.search(null, e);
    }
  }

  async addCategory(
    user: IUser,
    payload: ITransactionCategoryDto,
  ): Promise<any> {
    try {
      const parentCategory: ITransactionCategory = await this.transactionCategoryRepo.findById(
        payload.parentCategoryId,
      );
      if (parentCategory.isOutcome !== payload.isOutcome) {
        throw new Error('isOutcome field is common for all category tree');
      }
      const createdCategory: ITransactionCategory = this.transactionCategoryFactory.createTransactionCategory(
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
    payload: ITransactionCategoryDto,
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
