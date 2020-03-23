import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import {
  CreateTransactionCategoryInput,
  UpdateTransactionCategoryInput,
  TransactionCategory,
} from '../../graphql.schema.generated';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { OnlyRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../../../core/app/users/enums/roles.enum';

@Resolver('TransactionCategory')
@OnlyRoles(Roles.ADMINISTRATOR)
export class TransactionCategoriesResolver {
  constructor(
    @Inject('TransactionCategoryRepo')
    private readonly transactionCategoryRepo: IRepository<ITransactionCategory>,
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  transactionCategories(): Promise<ITransactionCategory[]> {
    return this.transactionCategoryRepo.findByAndCriteria({ owner: null });
  }

  @Query()
  @UseGuards(GqlAuthGuard)
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
  @UseGuards(GqlAuthGuard)
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
  @UseGuards(GqlAuthGuard)
  updateTransactionCategory(
    @Args('data') data: UpdateTransactionCategoryInput,
  ) {
    const { id, ...preparedData } = data;
    return this.transactionCategoryRepo.update(preparedData, id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  deleteTransactionCategory(@Args('id') id: string) {
    return this.transactionCategoryRepo
      .delete({ id })
      .then((result: ITransactionCategory) => result[0]);
  }
}
