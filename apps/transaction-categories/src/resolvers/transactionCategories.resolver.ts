import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, Inject, BadRequestException } from '@nestjs/common';

import IRepository from '@domain/repository.interface';
import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';

import IEventDispatchService from '@app/events/eventDispatchService.interface';
import { Roles } from '@app/users/enums/roles.enum';
import TransactionCategoryShouldBeDeletedEvent from '@app/events/transactionCategoryShouldBeDeleted.event';

import { OnlyRoles } from '@common/decorators/roles.decorator';
import {
  CreateTransactionCategoryInput,
  TransactionCategory,
  UpdateTransactionCategoryInput,
} from '@common/graphql.schema.generated';
import GqlAuthGuard from '@common/guards/gql-auth.guard';
import { TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG } from '@common/constants/errorMessages.constants';

@Resolver('TransactionCategory')
@OnlyRoles(Roles.ADMINISTRATOR)
export default class TransactionCategoriesResolver {
  private readonly transactionCategoryRepo: IRepository<ITransactionCategory>;

  constructor(
    @Inject('TransactionCategoryShoulBeDeletedEventDispatcher')
    private readonly transactionCategoryShoulBeDeletedEventDispatcher: IEventDispatchService<
      TransactionCategoryShouldBeDeletedEvent
    >,
    private readonly transactionCategoryFactory: TransactionCategoryAbstractFactory,
  ) {
    this.transactionCategoryRepo = transactionCategoryFactory.createTransactionCategoryRepo();
  }

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
  ): Promise<ITransactionCategory> {
    const { id, ...preparedData } = data;
    return this.transactionCategoryRepo.update(preparedData, id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteTransactionCategory(
    @Args('id') id: string,
  ): Promise<ITransactionCategory> {
    const category: ITransactionCategory = await this.transactionCategoryRepo.findById(
      id,
    );
    if (!category) {
      throw new BadRequestException(TRANSACTION_CATEGORY_IS_NOT_FOUND_MSG);
    }
    await this.transactionCategoryShoulBeDeletedEventDispatcher.emit(
      new TransactionCategoryShouldBeDeletedEvent(category),
    );
    return category;
  }
}
