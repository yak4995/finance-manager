import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import PrismaService from '../prisma/prisma.service';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import {
  CurrencyWhereInput,
  CurrencyOrderByInput,
} from '../../../../generated/prisma-client';

@Injectable()
export default class CurrencyRepository implements IRepository<ICurrency> {
  constructor(private readonly prisma: PrismaService) {}

  public async insert(entity: ICurrency): Promise<ICurrency> {
    return this.prisma.client.createCurrency(entity);
  }

  public findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<ICurrency>,
    searchCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency[]> {
    const queryData: {
      where?: CurrencyWhereInput;
      orderBy?: CurrencyOrderByInput;
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
      }` as CurrencyOrderByInput;
    }
    if (Object.keys(searchCriteria).length > 0) {
      Object.keys(searchCriteria).forEach((key: string) => {
        queryData.where[key] = searchCriteria[key];
      });
    }
    return this.prisma.client.currencies(queryData);
  }

  public findById(id: string): Promise<ICurrency> {
    return this.prisma.client.currency({ id });
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
      where?: CurrencyWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      queryData.where[key] = searchCriteria[key];
    });
    return this.prisma.client.currencies(queryData);
  }

  public findByOrCriteria(
    searchCriteria: Criteria<ICurrency>,
  ): Promise<ICurrency[]> {
    const queryData: {
      where?: CurrencyWhereInput;
    } = {};
    Object.keys(searchCriteria).reduce(
      (acc: CurrencyWhereInput, key: string): CurrencyWhereInput => {
        let temp: CurrencyWhereInput = acc;
        while (temp.OR !== undefined) {
          temp = temp.OR as CurrencyWhereInput;
        }
        temp.OR = {};
        temp.OR[key] = searchCriteria[key];
        return acc;
      },
      {},
    );
    return this.prisma.client.currencies(queryData);
  }

  public update(
    updateData: Criteria<ICurrency>,
    id: string,
  ): Promise<ICurrency> {
    return this.prisma.client.updateCurrency({
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
    return Promise.all(
      currenciesForDelete.map(
        (currency: ICurrency): Promise<ICurrency> =>
          this.prisma.client.deleteCurrency({ id: currency.id }),
      ),
    );
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
