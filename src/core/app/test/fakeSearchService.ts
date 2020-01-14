import ISearchService from '../search/searchService.interface';
import IPersistantEntity from '../../../core/domain/persistantEntity';

export default class FakeSearchService<T extends IPersistantEntity>
  implements ISearchService<T> {
  constructor(public readonly repoArr: T[]) {}

  async search(content: string, ...fields: Array<keyof T>): Promise<T[]> {
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
