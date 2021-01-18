import ISearchService from '@app/search/searchService.interface';

import ITransaction from '@domain/transactions/entities/transaction.interface';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import { METHOD_IS_NOT_IMPLEMENTED_MSG } from '@common/constants/errorMessages.constants';

import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class TransactionSearchService implements ISearchService<ITransaction> {
  constructor(private readonly elasticService: ElasticsearchService) {}

  insert(entity: ITransaction): Promise<boolean> {
    return this.elasticService
      .index({
        index: 'transactions',
        id: entity.id,
        body: entity,
      })
      .then(result => result.statusCode === 200)
      .catch(err => {
        FileLoggerService.log(err);
        throw err;
      });
  }

  remove(entity: ITransaction): Promise<boolean> {
    return this.elasticService
      .delete({
        index: 'transactions',
        id: entity.id,
      })
      .then(result => result.statusCode === 200)
      .catch(err => {
        FileLoggerService.log(err);
        throw err;
      });
  }

  search(
    content: string,
    ...fields: (keyof ITransaction)[]
  ): Promise<ITransaction[]> {
    if (fields.length > 1 || fields[0] !== 'description') {
      throw new Error(METHOD_IS_NOT_IMPLEMENTED_MSG);
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
