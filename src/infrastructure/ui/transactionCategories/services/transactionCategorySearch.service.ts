import { Injectable } from '@nestjs/common';
import ISearchService from '../../../../core/app/search/searchService.interface';
import ITransactionCategory from '../../../../core/domain/transactions/entities/transactionCategory.interface';

@Injectable()
export class TransactionCategorySearchService
  implements ISearchService<ITransactionCategory> {
  // TODO: implement ELK stack
  search(
    content: string,
    ...fields: Array<keyof ITransactionCategory>
  ): Promise<ITransactionCategory[]> {
    throw new Error('Method not implemented.');
  }
}
