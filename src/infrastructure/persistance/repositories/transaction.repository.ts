import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import PrismaService from '../prisma/prisma.service';
import ITransaction from '../../../core/domain/transactions/entities/transaction.interface';
import {
  Transaction,
  TransactionWhereInput,
  TransactionOrderByInput,
  TransactionCategoryCreateOneWithoutChildCategoriesInput,
  UserCredentialCreateOneWithoutTransactionCategoriesInput,
  CurrencyCreateOneWithoutTransactionsInput,
} from '../../../../generated/prisma-client';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';

@Injectable()
export default class TransactionRepository
  implements IRepository<ITransaction> {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(entity: ITransaction): Promise<ITransaction> {
    const { id, ...preparedData } = entity;
    let transactionCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput = null;
    let owner: UserCredentialCreateOneWithoutTransactionCategoriesInput = null;
    let currency: CurrencyCreateOneWithoutTransactionsInput = null;
    if (preparedData.transactionCategory !== null) {
      transactionCategory = {
        connect: { id: preparedData.transactionCategory.id },
      };
    } else {
      throw new Error(
        'transactionCategory has not been passed to TransactionRepository',
      );
    }
    if (preparedData.owner !== null) {
      owner = { connect: { id: preparedData.owner.id } };
    } else {
      throw new Error('owner has not been passed to TransactionRepository');
    }
    if (preparedData.currency !== null) {
      currency = { connect: { id: preparedData.currency.id } };
    } else {
      throw new Error('currency has not been passed to TransactionRepository');
    }
    const createdTransaction: Transaction = await this.prisma.client.createTransaction(
      Object.assign(preparedData, { transactionCategory, owner, currency }),
    );
    return {
      id: createdTransaction.id,
      datetime: new Date(createdTransaction.datetime),
      amount: createdTransaction.amount,
      description: createdTransaction.description ?? '',
      transactionCategory: (await this.getRelatedEntity(
        createdTransaction.id,
        'transactionCategory',
      )) as ITransactionCategory,
      currency: (await this.getRelatedEntity(
        createdTransaction.id,
        'currency',
      )) as ICurrency,
      owner: (await this.getRelatedEntity(
        createdTransaction.id,
        'owner',
      )) as IUserCredential,
    };
  }

  public async findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ITransaction>,
    searchCriteria: Criteria<ITransaction>,
  ): Promise<ITransaction[]> {
    const queryData: {
      where?: TransactionWhereInput;
      orderBy?: TransactionOrderByInput;
      skip?: number;
      after?: string;
      before?: string;
      first?: number;
      last?: number;
    } = {
      first: perPage,
      skip: (page - 1) * perPage,
      where: {},
    };
    if (Object.keys(orderBy).length > 0) {
      queryData.orderBy = `${Object.keys(orderBy)[0]}_${
        orderBy[Object.keys(orderBy)[0]]
      }` as TransactionOrderByInput;
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string) => {
        if (['owner', 'transactionCategory', 'currency'].includes(key)) {
          queryData.where[key] = {};
          queryData.where[key].id = searchCriteria[key].id;
        } else {
          queryData.where[key] = searchCriteria[key];
        }
      });
    }
    const result: Transaction[] = await this.prisma.client.transactions(
      queryData,
    );
    return Promise.all(
      result.map(
        async (t: Transaction): Promise<ITransaction> => ({
          id: t.id,
          datetime: new Date(t.datetime),
          amount: t.amount,
          description: t.description ?? '',
          transactionCategory: (await this.getRelatedEntity(
            t.id,
            'transactionCategory',
          )) as ITransactionCategory,
          currency: (await this.getRelatedEntity(
            t.id,
            'currency',
          )) as ICurrency,
          owner: (await this.getRelatedEntity(
            t.id,
            'owner',
          )) as IUserCredential,
        }),
      ),
    );
  }

  public async findById(id: string): Promise<ITransaction> {
    const result: Transaction = await this.prisma.client.transaction({ id });
    return {
      id: result.id,
      datetime: new Date(result.datetime),
      amount: result.amount,
      description: result.description ?? '',
      transactionCategory: (await this.getRelatedEntity(
        result.id,
        'transactionCategory',
      )) as ITransactionCategory,
      currency: (await this.getRelatedEntity(
        result.id,
        'currency',
      )) as ICurrency,
      owner: (await this.getRelatedEntity(
        result.id,
        'owner',
      )) as IUserCredential,
    };
  }

  public async findOneByAndCriteria(
    searchCriteria: Criteria<ITransaction>,
  ): Promise<ITransaction> {
    const result: ITransaction[] = await this.findByAndCriteria(searchCriteria);
    return result.length > 0 ? result[0] : null;
  }

  public async findByAndCriteria(
    searchCriteria: Criteria<ITransaction>,
  ): Promise<ITransaction[]> {
    const queryData: {
      where?: TransactionWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach(
      (key: keyof Criteria<ITransaction>): void => {
        if (key === 'owner') {
          if (searchCriteria[key]) {
            queryData.where[key] = { id: searchCriteria[key].id };
          }
          return;
        }
        if (key === 'range' && searchCriteria[key]?.field) {
          const { from, to } = searchCriteria[key];
          if (from && to) {
            queryData.where[`${searchCriteria[key].field}_gte`] = from;
            queryData.where[`${searchCriteria[key].field}_lte`] = to;
          } else if (from && !to) {
            queryData.where[`${searchCriteria[key].field}_gte`] = from;
          } else if (!from && to) {
            queryData.where[`${searchCriteria[key].field}_lte`] = to;
          }
          return;
        }
        queryData.where[key] = searchCriteria[key];
      },
    );
    const transactions: Transaction[] = await this.prisma.client.transactions(
      queryData,
    );
    const result: ITransaction[] = [];
    for await (const t of transactions) {
      result.push({
        id: t.id,
        datetime: new Date(t.datetime),
        amount: t.amount,
        description: t.description ?? '',
        transactionCategory: (await this.getRelatedEntity(
          t.id,
          'transactionCategory',
        )) as ITransactionCategory,
        currency: (await this.getRelatedEntity(t.id, 'currency')) as ICurrency,
        owner: (await this.getRelatedEntity(t.id, 'owner')) as IUserCredential,
      });
    }
    return result;
  }

  public async findByOrCriteria(
    searchCriteria: Criteria<ITransaction>,
  ): Promise<ITransaction[]> {
    const queryData: {
      where?: TransactionWhereInput;
    } = {};
    Object.keys(searchCriteria).reduce(
      (acc: TransactionWhereInput, key: string): TransactionWhereInput => {
        let temp: TransactionWhereInput = acc;
        while (temp.OR !== undefined) {
          temp = temp.OR as TransactionWhereInput;
        }
        temp.OR = {};
        temp.OR[key] = searchCriteria[key];
        return acc;
      },
      {},
    );
    const transactions: Transaction[] = await this.prisma.client.transactions(
      queryData,
    );
    const result: ITransaction[] = [];
    for (const t of transactions) {
      result.push({
        id: t.id,
        datetime: new Date(t.datetime),
        amount: t.amount,
        description: t.description ?? '',
        transactionCategory: (await this.getRelatedEntity(
          t.id,
          'transactionCategory',
        )) as ITransactionCategory,
        currency: (await this.getRelatedEntity(t.id, 'currency')) as ICurrency,
        owner: (await this.getRelatedEntity(t.id, 'owner')) as IUserCredential,
      });
    }
    return result;
  }

  public async update(
    updateData: Criteria<ITransaction>,
    id: string,
  ): Promise<ITransaction> {
    const { owner, transactionCategory, currency, ...data } = updateData;
    if (Object.keys(updateData).length > 0) {
      Object.keys(updateData).forEach((key: string) => {
        if (['owner', 'transactionCategory', 'currency'].includes(key)) {
          data[key] = { connect: {} };
          data[key].connect.id = updateData[key].id;
        } else {
          data[key] = updateData[key];
        }
      });
    }
    const result: Transaction = await this.prisma.client.updateTransaction({
      data,
      where: { id },
    });
    return {
      id: result.id,
      datetime: new Date(result.datetime),
      amount: result.amount,
      description: result.description ?? '',
      transactionCategory: (await this.getRelatedEntity(
        result.id,
        'transactionCategory',
      )) as ITransactionCategory,
      currency: (await this.getRelatedEntity(
        result.id,
        'currency',
      )) as ICurrency,
      owner: (await this.getRelatedEntity(
        result.id,
        'owner',
      )) as IUserCredential,
    };
  }

  public async delete(
    deleteCriteria: Criteria<ITransaction>,
  ): Promise<ITransaction[]> {
    const transactionsForDelete: ITransaction[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    const result: ITransaction[] = [];
    for await (const t of transactionsForDelete) {
      const deletionResult: Transaction = await this.prisma.client.deleteTransaction(
        { id: t.id },
      );
      result.push({
        id: deletionResult.id,
        datetime: new Date(deletionResult.datetime),
        amount: deletionResult.amount,
        description: deletionResult.description ?? '',
        transactionCategory: (await this.getRelatedEntity(
          deletionResult.id,
          'transactionCategory',
        )) as ITransactionCategory,
        currency: (await this.getRelatedEntity(
          deletionResult.id,
          'currency',
        )) as ICurrency,
        owner: (await this.getRelatedEntity(
          deletionResult.id,
          'owner',
        )) as IUserCredential,
      });
    }
    return result;
  }

  public async getRelatedEntity(
    id: string,
    fieldName: keyof ITransaction,
  ): Promise<IUserCredential | ITransactionCategory | ICurrency> {
    if (!['transactionCategory', 'owner', 'currency'].includes(fieldName)) {
      throw new Error(`${fieldName} of class doesn't have object type`);
    }
    switch (fieldName) {
      case 'transactionCategory':
        return this.prisma.client.transaction({ id }).transactionCategory();
      case 'owner':
        return this.prisma.client.transaction({ id }).owner();
      case 'currency':
        return this.prisma.client.transaction({ id }).currency();
    }
  }

  public getRelatedEntities(
    id: string,
    fieldName: keyof ITransaction,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have array type`);
  }
}
