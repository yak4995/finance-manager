import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import ITransaction from '../../../core/domain/transactions/entities/transaction.interface';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import {
  FindManytransactionsArgs,
  transactionsOrderByInput,
  transactionsWhereInput,
} from '@prisma/client';

@Injectable()
export default class TransactionRepository
  implements IRepository<ITransaction> {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(entity: ITransaction): Promise<ITransaction> {
    const {
      id,
      transactionCategory,
      owner,
      currency,
      ...preparedData
    } = entity;
    let transactionCategoryToConnect = null;
    let ownerToConnect = null;
    let currencyToConnect = null;
    if (transactionCategory !== null) {
      transactionCategoryToConnect = {
        connect: { id: transactionCategory.id },
      };
    } else {
      throw new Error(
        'transactionCategory has not been passed to TransactionRepository',
      );
    }
    if (owner !== null) {
      ownerToConnect = { connect: { id: owner.id } };
    } else {
      throw new Error('owner has not been passed to TransactionRepository');
    }
    if (currency !== null) {
      currencyToConnect = { connect: { id: currency.id } };
    } else {
      throw new Error('currency has not been passed to TransactionRepository');
    }
    const createdTransaction = await this.prisma.transactions.create({
      data: Object.assign(
        preparedData,
        { transaction_categories: transactionCategoryToConnect },
        { user_credentials: ownerToConnect },
        { currencies: currencyToConnect },
      ),
    });
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
    const queryData: FindManytransactionsArgs = {
      take: perPage,
      skip: (page - 1) * perPage,
      where: {},
      orderBy: [],
    };
    if (Object.keys(orderBy).length > 0) {
      (queryData.orderBy as transactionsOrderByInput[]).push(
        ...Object.keys(orderBy).map(
          (orderKey: string): transactionsOrderByInput => ({
            [`${orderKey}`]: (orderBy[`${orderKey}`] as
              | 'ASC'
              | 'DESC').toLowerCase(),
          }),
        ),
      );
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string) => {
        switch (key) {
          case 'owner':
            queryData.where.ownerId = searchCriteria[key].id;
            break;
          case 'transactionCategory':
            queryData.where.transactionCategoryId = searchCriteria[key].id;
            break;
          case 'currency':
            queryData.where.currencyId = searchCriteria[key].id;
            break;
          default:
            queryData.where[key] = searchCriteria[key];
            break;
        }
      });
    }
    const result = await this.prisma.transactions.findMany(queryData);
    return Promise.all(
      result.map(
        async (t): Promise<ITransaction> => ({
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
    const result = await this.prisma.transactions.findOne({ where: { id } });
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
      where?: transactionsWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach(
      (key: keyof Criteria<ITransaction>): void => {
        if (key === 'owner') {
          if (searchCriteria[key]) {
            queryData.where.ownerId = searchCriteria[key].id;
          }
          return;
        }
        if (key === 'transactionCategory') {
          if (searchCriteria[key]) {
            queryData.where.transactionCategoryId = searchCriteria[key].id;
          }
          return;
        }
        if (key === 'range' && searchCriteria[key]?.field) {
          const { from, to } = searchCriteria[key];
          queryData.where[`${searchCriteria[key].field}`] = {};
          if (from && to) {
            queryData.where[`${searchCriteria[key].field}`].gte = from;
            queryData.where[`${searchCriteria[key].field}`].lte = to;
          } else if (from && !to) {
            queryData.where[`${searchCriteria[key].field}`].gte = from;
          } else if (!from && to) {
            queryData.where[`${searchCriteria[key].field}`].lte = to;
          }
          return;
        }
        queryData.where[key] = searchCriteria[key];
      },
    );
    const transactions = await this.prisma.transactions.findMany(queryData);
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
      where?: transactionsWhereInput;
    } = { where: { OR: [] } };
    Object.keys(searchCriteria).reduce(
      (acc: transactionsWhereInput, key: string): transactionsWhereInput => {
        acc.OR.push({
          [`${key}`]: searchCriteria[key],
        });
        return acc;
      },
      {},
    );
    const transactions = await this.prisma.transactions.findMany(queryData);
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
        switch (key) {
          case 'owner':
            (data as any).user_credentials = { connect: {} };
            (data as any).user_credentials.connect.id = updateData[key].id;
            break;
          case 'transactionCategory':
            (data as any).transaction_categories = { connect: {} };
            (data as any).transaction_categories.connect.id =
              updateData[key].id;
            break;
          case 'currency':
            (data as any).currencies = { connect: {} };
            (data as any).currencies.connect.id = updateData[key].id;
            break;
          default:
            data[key] = updateData[key];
            break;
        }
      });
    }
    const result = await this.prisma.transactions.update({
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
    const { range, ...criteria } = deleteCriteria;
    await this.prisma.transactions.deleteMany({ where: criteria });
    return transactionsForDelete;
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
        return (this.prisma.transactions
          .findOne({ where: { id } })
          .transaction_categories() as unknown) as Promise<
          ITransactionCategory
        >;
      case 'owner':
        return (this.prisma.transactions
          .findOne({ where: { id } })
          .user_credentials() as unknown) as Promise<IUserCredential>;
      case 'currency':
        return (this.prisma.transactions
          .findOne({ where: { id } })
          .currencies() as unknown) as Promise<ICurrency>;
    }
  }

  public getRelatedEntities(
    id: string,
    fieldName: keyof ITransaction,
  ): Promise<never> {
    throw new Error(`${fieldName} of class doesn't have array type`);
  }
}
