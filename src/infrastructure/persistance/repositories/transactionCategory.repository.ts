import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import PrismaService from '../prisma/prisma.service';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import {
  TransactionCategoryWhereInput,
  TransactionCategoryOrderByInput,
  TransactionCategoryCreateOneWithoutChildCategoriesInput,
  UserCredentialCreateOneWithoutTransactionCategoriesInput,
} from '../../../../generated/prisma-client';
import { TransactionCategory } from '../../graphql.schema.generated';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';

@Injectable()
export default class TransactionCategoryRepository
  implements IRepository<ITransactionCategory> {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(
    entity: ITransactionCategory,
  ): Promise<ITransactionCategory> {
    const { id, ...preparedData } = entity;
    let parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput = null;
    let owner: UserCredentialCreateOneWithoutTransactionCategoriesInput = null;
    if (preparedData.parentCategory !== null) {
      parentCategory = { connect: { id: preparedData.parentCategory.id } };
    }
    if (preparedData.owner !== null) {
      owner = { connect: { id: preparedData.owner.id } };
    }
    const createdTransactionCategory: TransactionCategory = await this.prisma.client.createTransactionCategory(
      Object.assign(preparedData, { parentCategory, owner }),
    );
    return {
      id: createdTransactionCategory.id,
      isOutcome: createdTransactionCategory.isOutcome,
      isSystem: createdTransactionCategory.isSystem,
      name: createdTransactionCategory.name,
      owner: null,
      parentCategory: null,
    };
  }

  public async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ITransactionCategory>,
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const queryData: {
      where?: TransactionCategoryWhereInput;
      orderBy?: TransactionCategoryOrderByInput;
      skip?: number;
      after?: string;
      before?: string;
      first?: number;
      last?: number;
    } = {
      first: perPage,
      skip: (page - 1) * perPage,
    };
    if (Object.keys(orderBy).length > 0) {
      queryData.orderBy = `${Object.keys(orderBy)[0]}_${
        orderBy[Object.keys(orderBy)[0]]
      }` as TransactionCategoryOrderByInput;
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string) => {
        queryData.where[key] = searchCriteria[key];
      });
    }
    const result: TransactionCategory[] = await this.prisma.client.transactionCategories(
      queryData,
    );
    return result.map(
      (tc: TransactionCategory): ITransactionCategory => ({
        id: tc.id,
        isOutcome: tc.isOutcome,
        isSystem: tc.isSystem,
        name: tc.name,
        owner: null,
        parentCategory: null,
      }),
    );
  }

  public async findById(id: string): Promise<ITransactionCategory> {
    const result: TransactionCategory = await this.prisma.client.transactionCategory(
      { id },
    );
    return {
      id: result.id,
      isOutcome: result.isOutcome,
      isSystem: result.isSystem,
      name: result.name,
      owner: null,
      parentCategory: null,
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
      where?: TransactionCategoryWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      if (key === 'owner') {
        if (searchCriteria[key]) {
          queryData.where[key] = { id: searchCriteria[key].id };
        }
        return;
      }
      queryData.where[key] = searchCriteria[key];
    });
    const result: TransactionCategory[] = await this.prisma.client.transactionCategories(
      queryData,
    );
    return result.map(
      (tc: TransactionCategory): ITransactionCategory => ({
        id: tc.id,
        isOutcome: tc.isOutcome,
        isSystem: tc.isSystem,
        name: tc.name,
        owner: null,
        parentCategory: null,
      }),
    );
  }

  public async findByOrCriteria(
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const queryData: {
      where?: TransactionCategoryWhereInput;
    } = {};
    Object.keys(searchCriteria).reduce(
      (
        acc: TransactionCategoryWhereInput,
        key: string,
      ): TransactionCategoryWhereInput => {
        let temp: TransactionCategoryWhereInput = acc;
        while (temp.OR !== undefined) {
          temp = temp.OR as TransactionCategoryWhereInput;
        }
        temp.OR = {};
        temp.OR[key] = searchCriteria[key];
        return acc;
      },
      {},
    );
    const result: TransactionCategory[] = await this.prisma.client.transactionCategories(
      queryData,
    );
    return result.map(
      (tc: TransactionCategory): ITransactionCategory => ({
        id: tc.id,
        isOutcome: tc.isOutcome,
        isSystem: tc.isSystem,
        name: tc.name,
        owner: null,
        parentCategory: null,
      }),
    );
  }

  public async update(
    updateData: Criteria<ITransactionCategory>,
    id: string,
  ): Promise<ITransactionCategory> {
    if (updateData.parentCategory !== null) {
      await this.prisma.client.updateTransactionCategory({
        data: { parentCategory: { disconnect: true } },
        where: { id },
      });
      updateData.parentCategory = {
        connect: { id: updateData.parentCategory.id },
      };
    }
    const result: TransactionCategory = await this.prisma.client.updateTransactionCategory(
      {
        data: updateData,
        where: { id },
      },
    );
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
    return Promise.all(
      transactionCategoriesForDelete.map(
        (tc: ITransactionCategory): Promise<ITransactionCategory> =>
          this.prisma.client.deleteTransactionCategory({ id: tc.id }).then(
            (result: TransactionCategory): ITransactionCategory => ({
              id: result.id,
              isOutcome: result.isOutcome,
              isSystem: result.isSystem,
              name: result.name,
              owner: null,
              parentCategory: null,
            }),
          ),
      ),
    );
  }

  public async getRelatedEntity(
    id: string,
    fieldName: keyof ITransactionCategory,
  ): Promise<IUserCredential | ITransactionCategory> {
    if (!['parentCategory', 'owner'].includes(fieldName)) {
      throw new Error(`${fieldName} of class doesn't have object type`);
    }
    return fieldName === 'owner'
      ? await this.prisma.client.transactionCategory({ id }).owner()
      : await this.prisma.client.transactionCategory({ id }).parentCategory();
  }

  public getRelatedEntities(
    id: string,
    fieldName: keyof ITransactionCategory,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have array type`);
  }
}
