import ITransactionCategoryDto from '../dto/iTransactionCategory.dto';
import TransactionCategoryOutputPort from '../ports/transactionCategoryOutput.port';
import ISearchService from '../../search/searchService.interface';
import TransactionCategoryInputPort from '../ports/transactionCategotyInput.port';

import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';
import IUser from '@domain/users/entities/user.interface';

import {
  IS_OUTCOME_FLAG_ERROR_MSG,
  OWN_CATEGORY_PARENT_ERROR_MSG,
} from '@common/constants/errorMessages.constants';

export default class TransactionCategoryInteractor
  implements TransactionCategoryInputPort {
  private readonly transactionCategoryRepo: IRepository<ITransactionCategory>;

  constructor(
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
    private readonly searchService: ISearchService<ITransactionCategory>,
    private readonly transactionCategoryOutputPort: TransactionCategoryOutputPort,
  ) {
    this.transactionCategoryRepo = this.transactionCategoryFactory.createTransactionCategoryRepo();
  }

  async getTopCategories(user: IUser): Promise<any> {
    try {
      const systemTopCategories: ITransactionCategory[] = await this.transactionCategoryRepo.findByAndCriteria(
        {
          isSystem: true,
          parentCategory: null,
          owner: null,
        },
      );
      return this.transactionCategoryOutputPort.getTopCategories(
        systemTopCategories,
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
      ).filter(
        (c: ITransactionCategory | any): boolean =>
          c.owner.id === user.id || c.owner === null,
      );
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
      if (!payload?.parentCategoryId) {
        throw new Error(OWN_CATEGORY_PARENT_ERROR_MSG);
      }
      const parentCategory: ITransactionCategory = await this.transactionCategoryRepo.findById(
        payload.parentCategoryId,
      );
      if (parentCategory.isOutcome !== payload.isOutcome) {
        throw new Error(IS_OUTCOME_FLAG_ERROR_MSG);
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
      await this.searchService.insert(result);
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
      let parentCategory: ITransactionCategory = null;
      if (payload.parentCategoryId) {
        parentCategory = await this.transactionCategoryRepo.findById(
          payload.parentCategoryId,
        );
        if (parentCategory.isOutcome !== payload.isOutcome) {
          throw new Error(IS_OUTCOME_FLAG_ERROR_MSG);
        }
      }
      await this.searchService.remove(category);
      await Promise.all([
        this.transactionCategoryRepo.update(
          {
            name: payload.name,
            isOutcome: payload.isOutcome,
            parentCategory,
          },
          category.id,
        ),
        this.searchService.insert(
          Object.assign({}, category, {
            name: payload.name,
            isOutcome: payload.isOutcome,
            parentCategory,
          }),
        ),
      ]);
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
      await Promise.all([
        this.transactionCategoryRepo.delete({ id: category.id }),
        this.searchService.remove(category),
      ]);
      return this.transactionCategoryOutputPort.deleteCategory(category, null);
    } catch (e) {
      return this.transactionCategoryOutputPort.deleteCategory(null, e);
    }
  }
}
