import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import {
  TransactionCategoryWhereInput,
  TransactionCategoryOrderByInput,
  TransactionCategoryCreateOneWithoutChildCategoriesInput,
} from '../../../../generated/prisma-client';
import { TransactionCategory } from '../../graphql.schema.generated';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';

@Injectable()
export class TransactionCategoryRepository
  implements IRepository<ITransactionCategory> {
  constructor(private readonly prisma: PrismaService) {}

  insert(entity: ITransactionCategory): Promise<ITransactionCategory> {
    const { id, ...preparedData } = entity;
    let parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput = null;
    if (preparedData.parentCategory !== null) {
      parentCategory = { connect: { id: preparedData.parentCategory.id } };
    }
    return this.prisma.client
      .createTransactionCategory(
        Object.assign(preparedData, { parentCategory, owner: null }),
      )
      .then(
        (result: TransactionCategory): ITransactionCategory => ({
          id: result.id,
          isOutcome: result.isOutcome,
          isSystem: result.isSystem,
          name: result.name,
          owner: null,
          parentCategory: null,
        }),
      );
  }

  async findAll(
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
    return this.prisma.client
      .transactionCategories(queryData)
      .then((result: TransactionCategory[]): ITransactionCategory[] =>
        result.map(
          (tc: TransactionCategory): ITransactionCategory => ({
            id: tc.id,
            isOutcome: tc.isOutcome,
            isSystem: tc.isSystem,
            name: tc.name,
            owner: null,
            parentCategory: null,
          }),
        ),
      );
  }

  async findById(id: string): Promise<ITransactionCategory> {
    return this.prisma.client.transactionCategory({ id }).then(
      (result: TransactionCategory): ITransactionCategory => ({
        id: result.id,
        isOutcome: result.isOutcome,
        isSystem: result.isSystem,
        name: result.name,
        owner: null,
        parentCategory: null,
      }),
    );
  }

  async findOneByAndCriteria(
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory> {
    const result: ITransactionCategory[] = await this.findByAndCriteria(
      searchCriteria,
    );
    return result.length > 0 ? result[0] : null;
  }

  async findByAndCriteria(
    searchCriteria: Criteria<ITransactionCategory>,
  ): Promise<ITransactionCategory[]> {
    const queryData: {
      where?: TransactionCategoryWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string) => {
      queryData.where[key] = searchCriteria[key];
    });
    return this.prisma.client
      .transactionCategories(queryData)
      .then((result: TransactionCategory[]): ITransactionCategory[] =>
        result.map(
          (tc: TransactionCategory): ITransactionCategory => ({
            id: tc.id,
            isOutcome: tc.isOutcome,
            isSystem: tc.isSystem,
            name: tc.name,
            owner: null,
            parentCategory: null,
          }),
        ),
      );
  }

  async findByOrCriteria(
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
    return this.prisma.client
      .transactionCategories(queryData)
      .then((result: TransactionCategory[]): ITransactionCategory[] =>
        result.map(
          (tc: TransactionCategory): ITransactionCategory => ({
            id: tc.id,
            isOutcome: tc.isOutcome,
            isSystem: tc.isSystem,
            name: tc.name,
            owner: null,
            parentCategory: null,
          }),
        ),
      );
  }

  async update(
    updateData: Criteria<ITransactionCategory>,
    id: string,
  ): Promise<any> {
    if (updateData.parentCategory !== null) {
      await this.prisma.client.updateTransactionCategory({
        data: { parentCategory: { disconnect: true } },
        where: { id },
      });
      updateData.parentCategory = {
        connect: { id: updateData.parentCategory.id },
      };
    }
    return this.prisma.client.updateTransactionCategory({
      data: updateData,
      where: { id },
    });
  }

  async delete(deleteCriteria: Criteria<ITransactionCategory>): Promise<any> {
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

  async getRelatedEntity(
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

  getRelatedEntities(
    id: string,
    fieldName: keyof ITransactionCategory,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have array type`);
  }
}
