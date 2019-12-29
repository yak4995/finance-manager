import ISearchService from '../search/searchService.interface';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';

export default class FakeSearchService
  implements ISearchService<ITransactionCategory> {
  public repoArr: ITransactionCategory[] = [];

  async search(
    content: string,
    ...fields: (keyof ITransactionCategory)[]
  ): Promise<ITransactionCategory[]> {
    return this.repoArr.filter((tc: ITransactionCategory): boolean => {
      for (const fieldName of fields) {
        if ((tc[fieldName] as string).indexOf(content) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
}
