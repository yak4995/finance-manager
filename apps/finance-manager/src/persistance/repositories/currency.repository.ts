import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import {
  currenciesOrderByInput,
  currenciesWhereInput,
  FindManycurrenciesArgs,
} from '@prisma/client';

import IRepository, {
  Criteria,
  OrderCriteria,
} from '@domain/repository.interface';
import ICurrency from '@domain/currencies/entities/currency.interface';

@Injectable()
export default class CurrencyRepository implements IRepository<ICurrency> {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(entity: ICurrency): Promise<ICurrency> {
    return this.prisma.currencies.create({ data: entity });
  }

  public findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ICurrency>,
    searchCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency[]> {
    const queryData: FindManycurrenciesArgs = {
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: [],
    };
    if (Object.keys(orderBy).length > 0) {
      (queryData.orderBy as currenciesOrderByInput[]).push(
        ...Object.keys(orderBy).map(
          (orderKey: string): currenciesOrderByInput => ({
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
    return this.prisma.currencies.findMany(queryData);
  }

  public findById(id: string): Promise<ICurrency> {
    return this.prisma.currencies.findOne({ where: { id } });
  }

  async findOneByAndCriteria(
    searchCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency> {
    const result: ICurrency[] = await this.findByAndCriteria(searchCriteria);
    return result.length > 0 ? result[0] : null;
  }

  public findByAndCriteria(
    searchCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency[]> {
    const queryData: {
      where?: currenciesWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      queryData.where[key] = searchCriteria[key];
    });
    return this.prisma.currencies.findMany(queryData);
  }

  public findByOrCriteria(
    searchCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency[]> {
    const queryData: {
      where?: currenciesWhereInput;
    } = { where: { OR: [] } };
    Object.keys(searchCriteria).reduce(
      (acc: currenciesWhereInput, key: string): currenciesWhereInput => {
        acc.OR.push({
          [`${key}`]: searchCriteria[key],
        });
        return acc;
      },
      {},
    );
    return this.prisma.currencies.findMany(queryData);
  }

  public update(
    updateData: Criteria<ICurrency>,
    id: string,
  ): Promise<ICurrency> {
    return this.prisma.currencies.update({
      data: updateData,
      where: { id },
    });
  }

  public async delete(
    deleteCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency[]> {
    const currenciesForDelete: ICurrency[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    const { range, ...criteria } = deleteCriteria;
    await this.prisma.currencies.deleteMany({ where: criteria });
    return currenciesForDelete;
  }

  public async getRelatedEntity(
    id: string,
    fieldName: keyof ICurrency,
  ): Promise<never> {
    throw new Error(`${fieldName} of entity doesn't have object type`);
  }

  public async getRelatedEntities(
    id: string,
    fieldName: keyof ICurrency,
  ): Promise<never> {
    throw new Error(`${fieldName} of entity doesn't have array type`);
  }
}
