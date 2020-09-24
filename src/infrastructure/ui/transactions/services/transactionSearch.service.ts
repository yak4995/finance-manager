import { Injectable } from '@nestjs/common';
import ISearchService from '../../../../core/app/search/searchService.interface';
import ITransaction from '../../../../core/domain/transactions/entities/transaction.interface';

@Injectable()
export class TransactionSearchService implements ISearchService<ITransaction> {
  // TODO: implement ELK stack
  search(
    content: string,
    ...fields: (keyof ITransaction)[]
  ): Promise<ITransaction[]> {
    throw new Error('Method not implemented.');
  }
}
