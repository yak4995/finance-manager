import TransactionCategoryInputPort from '../ports/transactionCategotyInput.port';
import IRepository from '../../../domain/repository.interface';
import ITransactionCategory from '../../../domain/transactions/entities/transactionCategory.interface';
import EntityFactory from '../../entityFactory';
import IUser from '../../../domain/users/entities/user.interface';
import TransactionCategoryDto from '../dto/transactionCategory.dto';
import TransactionCategoryOutputPort from '../ports/transactionCategoryOutput.port';
import ISearchService from '../../search/searchService.interface';
import TransactionCategoryService from '../../../domain/transactions/services/transactionCategoryService';

export class TransactionCategoryInteractor
  implements TransactionCategoryInputPort {
  constructor(
    private readonly entityFactory: EntityFactory,
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly transactionCategoryService: TransactionCategoryService,
    private readonly searchService: ISearchService<ITransactionCategory>,
    private readonly transactionCategoryOutputPort: TransactionCategoryOutputPort,
  ) {}

  async getTopCategories(user: IUser): Promise<void> {
    const [ownTopCategories, systemTopCategories] = await Promise.all([
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
    await this.transactionCategoryOutputPort.getTopCategories([
      ...ownTopCategories,
      ...systemTopCategories,
    ]);
  }

  async getCategoryDirectChildren(
    category: ITransactionCategory,
  ): Promise<void> {
    const result = await this.transactionCategoryService.getTransactionCategoryDirectChildren(
      category,
    );
    await this.transactionCategoryOutputPort.getCategoryDirectChildren(result);
  }

  async getOwnCategories(user: IUser): Promise<void> {
    const result = await this.transactionCategoryRepo.findByAndCriteria({
      owner: user,
      isSystem: false,
    });
    await this.transactionCategoryOutputPort.getOwnCategories(result);
  }

  async search(user: IUser, content: string): Promise<void> {
    const result = (await this.searchService.search(content, 'name')).filter(
      c => c.owner.id !== user.id,
    );
    await this.transactionCategoryOutputPort.search(result);
  }

  async addCategory(
    user: IUser,
    payload: TransactionCategoryDto,
  ): Promise<void> {
    try {
      const parentCategory = await this.transactionCategoryRepo.findById(
        payload.parentCategoryId,
      );
      if (parentCategory.isOutcome !== payload.isOutcome) {
        throw new Error('isOutcome field is common for all category tree');
      }
      const createdCategory = this.entityFactory.createTransactionCategory({
        name: payload.name,
        parentCategory,
        owner: user,
        isOutcome: payload.isOutcome,
        isSystem: false,
      });
      const result = await this.transactionCategoryRepo.insert(createdCategory);
      await this.transactionCategoryOutputPort.addCategory(result);
    } catch (e) {
      await this.transactionCategoryOutputPort.addCategory(null);
    }
  }

  async updateCategory(
    category: ITransactionCategory,
    payload: TransactionCategoryDto,
  ): Promise<void> {
    try {
      const parentCategory = await this.transactionCategoryRepo.findById(
        payload.parentCategoryId,
      );
      if (parentCategory.isOutcome !== payload.isOutcome) {
        throw new Error('isOutcome field is common for all category tree');
      }
      const result = await this.transactionCategoryRepo.update(
        {
          name: payload.name,
          isOutcome: payload.isOutcome,
          parentCategory,
        },
        category.id,
      );
      await this.transactionCategoryOutputPort.updateCategory(result);
    } catch (e) {
      await this.transactionCategoryOutputPort.updateCategory(null);
    }
  }

  async deleteCategory(category: ITransactionCategory): Promise<void> {
    try {
      await this.transactionCategoryRepo.delete({ id: category.id });
      await this.transactionCategoryOutputPort.deleteCategory(category);
    } catch (e) {
      await this.transactionCategoryOutputPort.deleteCategory(null);
    }
  }
}
