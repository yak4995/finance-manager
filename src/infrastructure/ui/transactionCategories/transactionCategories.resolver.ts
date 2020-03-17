import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import {
  CreateTransactionCategoryInput,
  UpdateTransactionCategoryInput,
  TransactionCategory,
} from '../../graphql.schema.generated';

@Resolver('TransactionCategory')
export class TransactionCategoriesResolver {
  constructor(
    @Inject('TransactionCategoryRepo')
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {}

  @Query()
  transactionCategories(): Promise<ITransactionCategory[]> {
    return this.transactionCategoryRepo.findByAndCriteria({ owner: null });
  }

  @Query()
  async transactionCategory(
    @Args('id') id: string,
  ): Promise<ITransactionCategory> {
    return this.transactionCategoryRepo.findById(id);
  }

  @ResolveProperty('parentCategory')
  getParentCategory(
    @Parent() { id }: TransactionCategory,
  ): Promise<ITransactionCategory> {
    return this.transactionCategoryRepo.getRelatedEntity(id, 'parentCategory');
  }

  @Mutation()
  createTransactionCategory(
    @Args('data') data: CreateTransactionCategoryInput,
  ): Promise<ITransactionCategory> {
    const {
      id,
      ...preparedData
    } = this.transactionCategoryFactory.createTransactionCategory(data);
    return this.transactionCategoryRepo.insert(
      preparedData as ITransactionCategory,
    );
  }

  @Mutation()
  updateTransactionCategory(
    @Args('data') data: UpdateTransactionCategoryInput,
  ) {
    const { id, ...preparedData } = data;
    return this.transactionCategoryRepo.update(preparedData, id);
  }

  @Mutation()
  deleteTransactionCategory(@Args('id') id: string) {
    return this.transactionCategoryRepo
      .delete({ id })
      .then((result: ITransactionCategory) => result[0]);
  }
}
