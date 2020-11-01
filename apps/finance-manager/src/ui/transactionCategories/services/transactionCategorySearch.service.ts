import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

import ISearchService from '@app/search/searchService.interface';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';

@Injectable()
export class TransactionCategorySearchService
  implements ISearchService<ITransactionCategory> {
  constructor(private readonly elasticService: ElasticsearchService) {}

  insert(entity: ITransactionCategory): Promise<boolean> {
    return this.elasticService
      .index({
        index: 'transaction_categories',
        id: entity.id,
        body: entity,
      })
      .then(result => result.statusCode === 200);
  }

  remove(entity: ITransactionCategory): Promise<boolean> {
    return this.elasticService
      .delete({
        index: 'transaction_categories',
        id: entity.id,
      })
      .then(result => result.statusCode === 200);
  }

  search(
    content: string,
    ...fields: Array<keyof ITransactionCategory>
  ): Promise<ITransactionCategory[]> {
    if (fields.length > 1 || fields[0] !== 'name') {
      throw new Error('Method not implemented.');
    }
    return this.elasticService
      .search({
        index: 'transaction_categories',
        body: {
          query: {
            match: {
              name: content,
            },
          },
        },
      })
      .then(
        result =>
          result.body.hits.hits.map(
            value => value._source,
          ) as ITransactionCategory[],
      );
  }
}
