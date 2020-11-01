import IRepository, {
  OrderCriteria,
  Criteria,
} from '../../repository.interface';
import IPersistantEntity from '../../persistantEntity';

/* istanbul ignore next */
export default class FakeRepo<T extends IPersistantEntity>
  implements IRepository<T> {
  constructor(private readonly repoArr: T[]) {}

  private isCategoryFitsByAndSearchCriateria(
    entity: T,
    searchCriteria: Criteria<T>,
  ): boolean {
    const { range, ...others } = searchCriteria;
    if (
      range &&
      searchCriteria.range &&
      searchCriteria?.range?.field === 'datetime' &&
      ((searchCriteria?.range?.from &&
        searchCriteria?.range?.to &&
        (entity[searchCriteria?.range?.field] < searchCriteria?.range?.from ||
          entity[searchCriteria?.range?.field] > searchCriteria?.range?.to)) ||
        (searchCriteria?.range?.from &&
          !searchCriteria?.range?.to &&
          entity[searchCriteria?.range?.field] < searchCriteria?.range?.from) ||
        (!searchCriteria?.range?.from &&
          searchCriteria?.range?.to &&
          entity[searchCriteria?.range?.field] > searchCriteria?.range?.to))
    ) {
      return false;
    }
    for (const fieldName in others) {
      if (
        (typeof entity[fieldName] === 'object' &&
          ((searchCriteria[fieldName] !== null &&
            entity[fieldName] !== null &&
            searchCriteria[fieldName]['id'] !== entity[fieldName]['id']) ||
            (searchCriteria[fieldName] !== null &&
              entity[fieldName] === null) ||
            (searchCriteria[fieldName] === null &&
              entity[fieldName] !== null))) ||
        (typeof entity[fieldName] !== 'object' &&
          searchCriteria[fieldName] &&
          searchCriteria[fieldName] !== entity[fieldName])
      ) {
        return false;
      }
    }
    return true;
  }

  private isCategoryFitsByOrSearchCriateria(
    entity: T,
    searchCriteria: Criteria<T>,
  ): boolean {
    for (const fieldName in searchCriteria) {
      if (
        (typeof entity[fieldName] === 'object' &&
          ((searchCriteria[fieldName] !== null &&
            entity[fieldName] !== null &&
            searchCriteria[fieldName]['id'] === entity[fieldName]['id']) ||
            (searchCriteria[fieldName] === null &&
              entity[fieldName] === null))) ||
        (typeof entity[fieldName] !== 'object' &&
          searchCriteria[fieldName] &&
          searchCriteria[fieldName] === entity[fieldName])
      ) {
        return true;
      }
    }
    return false;
  }

  async insert(entity: T): Promise<T> {
    this.repoArr.push(entity);
    return entity;
  }

  async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<T>,
    searchCriteria: Criteria<T>,
  ): Promise<T[]> {
    const resultSet: T[] = Array.from<T>(
      await this.findByAndCriteria(searchCriteria),
    );
    if (Object.keys(orderBy).length > 0) {
      resultSet.sort((a: T, b: T): number => {
        const key = Object.keys(orderBy)[0];
        if (typeof a[key] !== 'object' && typeof b[key] !== 'object') {
          if (orderBy[key] === 'ASC') {
            if (a[key] < b[key]) {
              return -1;
            }
            if (a[key] > b[key]) {
              return 1;
            }
          } else {
            if (a[key] < b[key]) {
              return 1;
            }
            if (a[key] > b[key]) {
              return -1;
            }
          }
        }
        return 0;
      });
    }
    const offset: number = (page - 1) * perPage;
    return resultSet.slice(offset, offset + perPage);
  }

  async findById(id: string): Promise<T> {
    const resultArray = this.repoArr.filter(entity => entity.id === id);
    if (resultArray.length === 0) {
      throw new Error('Such entity has not been found!');
    }
    return resultArray[0];
  }

  async findOneByAndCriteria(searchCriteria: Criteria<T>): Promise<T> {
    for (const tc of this.repoArr) {
      if (this.isCategoryFitsByAndSearchCriateria(tc, searchCriteria)) {
        return tc;
      }
    }
    throw new Error('Such entity has not been found!');
  }

  async findByAndCriteria(searchCriteria: Criteria<T>): Promise<T[]> {
    const result: T[] = [];
    for (const tc of this.repoArr) {
      if (this.isCategoryFitsByAndSearchCriateria(tc, searchCriteria)) {
        result.push(tc);
      }
    }
    return result;
  }

  async findByOrCriteria(searchCriteria: Criteria<T>): Promise<T[]> {
    const result: T[] = [];
    for (const tc of this.repoArr) {
      if (this.isCategoryFitsByOrSearchCriateria(tc, searchCriteria)) {
        result.push(tc);
      }
    }
    return result;
  }

  async update(updateData: Criteria<T>, id: string): Promise<null> {
    const index = this.repoArr.findIndex(element => element.id === id);
    if (index === -1) {
      throw new Error('Entity with this id has not been found in the repo!');
    }
    Object.keys(updateData).forEach(key => {
      this.repoArr[index][key] = updateData[key];
    });
    return null;
  }

  async delete(deleteCriteria: Criteria<T>): Promise<null> {
    const neededElementsIds: string[] = (
      await this.findByAndCriteria(deleteCriteria)
    ).map((entity: T): string => entity.id);
    const indexesForDelete: number[] = [];
    for (let i = 0; i < this.repoArr.length; i++) {
      if (neededElementsIds.includes(this.repoArr[i].id)) {
        indexesForDelete.push(i);
      }
    }
    for (let i = 0; i < indexesForDelete.length; i++) {
      this.repoArr.splice(indexesForDelete[i], 1);
      for (let j = i + 1; j < indexesForDelete.length; j++) {
        if (indexesForDelete[j] > indexesForDelete[i]) {
          indexesForDelete[j]--;
        }
      }
    }
    return null;
  }

  async getRelatedEntity(id: string, fieldName: keyof T): Promise<any> {
    const entity: T = await this.findById(id);
    if (
      typeof entity[fieldName] !== 'object' ||
      Array.isArray(entity[fieldName])
    ) {
      throw new Error(`${fieldName} of entity doesn't have object type`);
    }
    return entity[fieldName];
  }

  async getRelatedEntities(id: string, fieldName: keyof T): Promise<any[]> {
    const result = (await this.findById(id))[fieldName];
    if (!Array.isArray(result)) {
      throw new Error(`${fieldName} of entity doesn't have array type`);
    }
    return result;
  }
}
