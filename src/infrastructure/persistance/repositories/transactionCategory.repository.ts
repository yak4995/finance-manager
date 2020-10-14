import { Injectable, Inject } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import { CacheService } from '../../cache.service';
import {
  FindManytransaction_categoriesArgs,
  transaction_categoriesOrderByInput,
  transaction_categoriesWhereInput,
} from '@prisma/client';

@Injectable()
export default class TransactionCategoryRepository
  implements IRepository<ITransactionCategory> {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CategoryCacheService')
    private readonly cacheService: CacheService<ITransactionCategory>,
  ) {}

  public async insert(
    entity: ITransactionCategory,
  ): Promise<ITransactionCategory> {
    const { id, owner, parentCategory, ...preparedData } = entity;
    let parentCategoryToConnect = null;
    let ownerToConnect = null;
    if (parentCategory !== null) {
      parentCategoryToConnect = { connect: { id: parentCategory.id } };
    }
    if (owner !== null) {
      ownerToConnect = { connect: { id: owner.id } };
    }
    const createdTransactionCategory = await this.prisma.transaction_categories.create(
      {
        data: Object.assign(
          preparedData,
          parentCategoryToConnect
            ? { transaction_categories: parentCategoryToConnect }
            : {},
          ownerToConnect ? { user_credentials: ownerToConnect } : {},
        ),
      },
    );
    await this.cacheService.set(`categories_${id}_parent`, parentCategory);
    return {
      id: createdTransactionCategory.id,
      isOutcome: createdTransactionCategory.isOutcome,
      isSystem: createdTransactionCategory.isSystem,
      name: createdTransactionCategory.name,
      owner: await this.getRelatedEntity(
        createdTransactionCategory.id,
        'owner',
      ),
      parentCategory: (await this.getRelatedEntity(
        createdTransactionCategory.id,
        'parentCategory',
      )) as ITransactionCategory,
    };
  }

  public async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ITransactionCategory>,
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const queryData: FindManytransaction_categoriesArgs = {
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: [],
    };
    if (Object.keys(orderBy).length > 0) {
      (queryData.orderBy as transaction_categoriesOrderByInput[]).push(
        ...Object.keys(orderBy).map(
          (orderKey: string): transaction_categoriesOrderByInput => ({
            [`${orderKey}`]: (orderBy[`${orderKey}`] as
              | 'ASC'
              | 'DESC').toLowerCase(),
          }),
        ),
      );
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string) => {
        queryData.where[key] = searchCriteria[key];
      });
    }
    const transactionCategories = await this.prisma.transaction_categories.findMany(
      queryData,
    );
    const result: ITransactionCategory[] = [];
    for await (const tc of transactionCategories) {
      result.push({
        id: tc.id,
        isOutcome: tc.isOutcome,
        isSystem: tc.isSystem,
        name: tc.name,
        owner: await this.getRelatedEntity(tc.id, 'owner'),
        parentCategory: (await this.getRelatedEntity(
          tc.id,
          'parentCategory',
        )) as ITransactionCategory,
      });
    }
    return result;
  }

  public async findById(id: string): Promise<ITransactionCategory> {
    const result = await this.prisma.transaction_categories.findOne({
      where: { id },
    });
    return {
      id: result.id,
      isOutcome: result.isOutcome,
      isSystem: result.isSystem,
      name: result.name,
      owner: await this.getRelatedEntity(result.id, 'owner'),
      parentCategory: (await this.getRelatedEntity(
        result.id,
        'parentCategory',
      )) as ITransactionCategory,
    };
  }

  public async findOneByAndCriteria(
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory> {
    const result: ITransactionCategory[] = await this.findByAndCriteria(
      searchCriteria,
    );
    return result.length > 0 ? result[0] : null;
  }

  public async findByAndCriteria(
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const queryData: {
      where?: transaction_categoriesWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      switch (key) {
        case 'owner':
          if (searchCriteria[key]) {
            queryData.where.ownerId = searchCriteria[key]
              ? searchCriteria[key].id
              : null;
          }
          break;
        case 'parentCategory':
          queryData.where.parentCategoryId = searchCriteria[key]
            ? searchCriteria[key].id
            : null;
          break;
        default:
          queryData.where[key] = searchCriteria[key];
          break;
      }
    });
    const transactionCategories = await this.prisma.transaction_categories.findMany(
      queryData,
    );
    const result: ITransactionCategory[] = [];
    for await (const tc of transactionCategories) {
      result.push({
        id: tc.id,
        isOutcome: tc.isOutcome,
        isSystem: tc.isSystem,
        name: tc.name,
        owner: await this.getRelatedEntity(tc.id, 'owner'),
        parentCategory: (await this.getRelatedEntity(
          tc.id,
          'parentCategory',
        )) as ITransactionCategory,
      });
    }
    return result;
  }

  public async findByOrCriteria(
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const queryData: {
      where?: transaction_categoriesWhereInput;
    } = { where: { OR: [] } };
    Object.keys(searchCriteria).reduce(
      (
        acc: transaction_categoriesWhereInput,
        key: string,
      ): transaction_categoriesWhereInput => {
        acc.OR.push({
          [`${key}`]: searchCriteria[key],
        });
        return acc;
      },
      {},
    );
    const transactionCategories = await this.prisma.transaction_categories.findMany(
      queryData,
    );
    const result: ITransactionCategory[] = [];
    for await (const tc of transactionCategories) {
      result.push({
        id: tc.id,
        isOutcome: tc.isOutcome,
        isSystem: tc.isSystem,
        name: tc.name,
        owner: await this.getRelatedEntity(tc.id, 'owner'),
        parentCategory: (await this.getRelatedEntity(
          tc.id,
          'parentCategory',
        )) as ITransactionCategory,
      });
    }
    return result;
  }

  public async update(
    updateData: Criteria<ITransactionCategory>,
    id: string,
  ): Promise<ITransactionCategory> {
    const transactionCategory = await this.findById(id);
    const { parentCategory, ...preparedUpdateData } = updateData;
    if (parentCategory !== null) {
      if (transactionCategory.parentCategory) {
        await Promise.all([
          this.prisma.transaction_categories.update({
            data: { transaction_categories: { disconnect: true } },
            where: { id },
          }),
          this.cacheService.set(`categories_${id}_parent`, parentCategory),
        ]);
      }
      (preparedUpdateData as any).transaction_categories = {
        connect: { id: parentCategory.id },
      };
    }
    const result = await this.prisma.transaction_categories.update({
      data: preparedUpdateData,
      where: { id },
    });
    return {
      ...result,
      parentCategory: (await this.getRelatedEntity(
        result.id,
        'parentCategory',
      )) as ITransactionCategory,
      owner: await this.getRelatedEntity(result.id, 'owner'),
    };
  }

  public async delete(
    deleteCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const transactionCategoriesForDelete: ITransactionCategory[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    const { range, ...criteria } = deleteCriteria;
    await Promise.all([
      this.prisma.transaction_categories.deleteMany({ where: criteria }),
      this.cacheService.delete(`categories_${criteria?.id}_parent`),
    ]);
    return transactionCategoriesForDelete;
  }

  public async getRelatedEntity(
    id: string,
    fieldName: keyof ITransactionCategory,
  ): Promise<IUserCredential | ITransactionCategory> {
    if (!['parentCategory', 'owner'].includes(fieldName)) {
      throw new Error(`${fieldName} of class doesn't have object type`);
    }
    if (fieldName === 'parentCategory') {
      try {
        const result: ITransactionCategory = await this.cacheService.get(
          `categories_${id}_parent`,
        );
        return result;
      } catch (e) {
        const result: ITransactionCategory = ((await this.prisma.transaction_categories
          .findOne({ where: { id } })
          .transaction_categories()) as unknown) as ITransactionCategory;
        await this.cacheService.set(`categories_${id}_parent`, result);
        return result;
      }
    } else {
      return (this.prisma.transaction_categories
        .findOne({ where: { id } })
        .user_credentials() as unknown) as IUserCredential;
    }
  }

  public getRelatedEntities(
    id: string,
    fieldName: keyof ITransactionCategory,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have array type`);
  }
}
