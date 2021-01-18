import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc';

import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';
import TransactionCategoryService from '@domain/transactionCategories/services/transactionCategoryService';
import ITransactionCategoriesFacade from '@domain/transactionCategories/transactionCategories.facade';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import { CategoryId } from './dtos/categoryId';
import { grpcClientOptions } from './grpcClient.options';

interface ITransactionCategoriesRemoteFacade {
  findById(
    data: CategoryId,
    metadata: Metadata,
  ): Observable<ITransactionCategory>;
  getTransactionCategoryChildren(
    data: ITransactionCategory,
    metadata: Metadata,
  ): Observable<ITransactionCategory[]>;
  getTransactionCategoryDirectChildren(
    data: ITransactionCategory,
    metadata: Metadata,
  ): Observable<ITransactionCategory[]>;
}

// TODO: make singleton?
@Controller()
export class TransactionCategoriesFacade
  implements ITransactionCategoriesFacade {
  @Client(grpcClientOptions)
  private readonly _client: ClientGrpc;
  private remoteFacade: ITransactionCategoriesRemoteFacade;
  private readonly transactionCategoriesRepo: IRepository<ITransactionCategory>;

  constructor(
    private readonly transactionCategoryService: TransactionCategoryService,
    transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {
    this.transactionCategoriesRepo = transactionCategoryFactory.createTransactionCategoryRepo();
  }

  onModuleInit() {
    this.remoteFacade = this._client.getService<
      ITransactionCategoriesRemoteFacade
    >('CategoriesFacade');
  }

  @GrpcMethod('CategoriesFacade', 'getTransactionCategoryChildren')
  @UsePipes(ValidationPipe)
  public getTransactionCategoryChildren(
    data: ITransactionCategory,
    metadata: Metadata,
  ): Promise<{ result: ITransactionCategory[] }> {
    return this.transactionCategoryService
      .getTransactionCategoryChildren(data)
      .then(result => ({ result }))
      .catch(err => {
        FileLoggerService.error(
          `From request: ${metadata.get('requestId')}; ${err.message}`,
          err.trace,
          'CategoriesFacade::getTransactionCategoryChildrenHandler',
        );
        throw err;
      });
  }

  @GrpcMethod('CategoriesFacade', 'getTransactionCategoryDirectChildren')
  @UsePipes(ValidationPipe)
  public getTransactionCategoryDirectChildren(
    data: ITransactionCategory,
    metadata: Metadata,
  ): Promise<{ result: ITransactionCategory[] }> {
    return this.transactionCategoryService
      .getTransactionCategoryDirectChildren(data)
      .then(result => ({ result }))
      .catch(err => {
        FileLoggerService.error(
          `From request: ${metadata.get('requestId')}; ${err.message}`,
          err.trace,
          'CategoriesFacade::getTransactionCategoryDirectChildrenHandler',
        );
        throw err;
      });
  }

  @GrpcMethod('CategoriesFacade', 'findById')
  @UsePipes(ValidationPipe)
  public findById(
    data: CategoryId,
    metadata: Metadata,
  ): Promise<ITransactionCategory> {
    return this.transactionCategoriesRepo.findById(data.id).catch(err => {
      FileLoggerService.error(
        `From request: ${metadata.get('requestId')}; ${err.message}`,
        err.trace,
        'CategoriesFacade::findByIdHandler',
      );
      throw err;
    });
  }
}
