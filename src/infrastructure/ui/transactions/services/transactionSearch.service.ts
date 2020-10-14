import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import ISearchService from '../../../../core/app/search/searchService.interface';
import ITransaction from '../../../../core/domain/transactions/entities/transaction.interface';

@Injectable()
export class TransactionSearchService implements ISearchService<ITransaction> {
  constructor(private readonly elasticService: ElasticsearchService) {}

  insert(entity: ITransaction): Promise<boolean> {
    console.log('here');
    return this.elasticService
      .index({
        index: 'transactions',
        id: entity.id,
        body: entity,
      })
      .then(result => result.statusCode === 200);
  }

  remove(entity: ITransaction): Promise<boolean> {
    return this.elasticService
      .delete({
        index: 'transactions',
        id: entity.id,
      })
      .then(result => result.statusCode === 200);
  }

  search(
    content: string,
    ...fields: (keyof ITransaction)[]
  ): Promise<ITransaction[]> {
    if (fields.length > 1 || fields[0] !== 'description') {
      throw new Error('Method not implemented.');
    }
    return this.elasticService
      .search({
        index: 'transactions',
        body: {
          query: {
            match: {
              description: content,
            },
          },
        },
      })
      .then(
        result =>
          result.body.hits.hits.map(value => value._source) as ITransaction[],
      );
  }
}
