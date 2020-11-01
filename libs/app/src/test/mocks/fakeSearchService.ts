import IPersistantEntity from '../../../../domain/src/persistantEntity';

import ISearchService from '../../search/searchService.interface';

/* istanbul ignore next */
export default class FakeSearchService<T extends IPersistantEntity>
  implements ISearchService<T> {
  constructor(public readonly repoArr: T[]) {}

  async insert(entity: T): Promise<boolean> {
    return true;
  }

  async remove(entity: T): Promise<boolean> {
    return true;
  }

  async search(content: string, ...fields: Array<keyof T>): Promise<T[]> {
    if (content === 'wrong') {
      throw new Error('Incorrect content');
    }
    return this.repoArr.filter((tc: T): boolean => {
      for (const fieldName of fields) {
        if (((tc[fieldName] as unknown) as string).indexOf(content) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
}
