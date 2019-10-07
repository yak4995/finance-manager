import IRepository, { OrderCriteria, Criteria } from '../repository.interface';
import ITransactionCategory from '../transactions/entities/transactionCategory.interface';

export const firstCategory = {
  id: '1',
  name: '',
  parentCategory: null,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const secondCategory = {
  id: '2',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const thirdCategory = {
  id: '3',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const fourthCategory = {
  id: '4',
  name: '',
  parentCategory: firstCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const fifthCategory = {
  id: '5',
  name: '',
  parentCategory: secondCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const sixthCategory = {
  id: '6',
  name: '',
  parentCategory: thirdCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export const seventhCategory = {
  id: '7',
  name: '',
  parentCategory: thirdCategory,
  owner: null,
  isSystem: true,
  isOutcome: true,
};

export default class FakeCategoryRepo
  implements IRepository<ITransactionCategory> {
  private repoArr: ITransactionCategory[] = [
    firstCategory,
    secondCategory,
    thirdCategory,
    fourthCategory,
    fifthCategory,
    sixthCategory,
    seventhCategory,
  ];
  async insert(entity: ITransactionCategory): Promise<ITransactionCategory> {
    return entity;
  }
  async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ITransactionCategory>,
  ) {
    return [];
  }
  async findById(id: string) {
    return null;
  }
  async findOneByAndCriteria(searchCriteria: Criteria<ITransactionCategory>) {
    return null;
  }
  async findByAndCriteria(searchCriteria: Criteria<ITransactionCategory>) {
    if (
      searchCriteria.parentCategory ||
      searchCriteria.parentCategory === null
    ) {
      return this.repoArr.filter(tc =>
        searchCriteria.parentCategory === null
          ? tc.parentCategory === null
          : tc.parentCategory !== null &&
            tc.parentCategory.id === searchCriteria.parentCategory.id,
      );
    } else {
      return [];
    }
  }
  async findByOrCriteria(searchCriteria: Criteria<ITransactionCategory>) {
    return [];
  }
  async update(updateData: Criteria<ITransactionCategory>, id: string) {
    return null;
  }
  async delete(deleteCriteria: Criteria<ITransactionCategory>) {
    return null;
  }
}
