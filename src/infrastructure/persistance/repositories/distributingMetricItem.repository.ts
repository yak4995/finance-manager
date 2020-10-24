import { Injectable } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import {
  Criteria,
  OrderCriteria,
} from '../../../core/domain/repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import IDistributingMetricItem from '../../../core/app/transactions/entities/distributingMetricItem.interface';
import ITransactionCategory from '../../../core/domain/transactionCategories/entities/transactionCategory.interface';
import ICurrency from '../../../core/domain/currencies/entities/currency.interface';
import { distributing_metric_itemsWhereInput } from '@prisma/client';
import IUserCredential from '../../../core/app/users/entities/userCredential.interface';

@Injectable()
export default class DistributingMetricItemRepository
  implements IRepository<IDistributingMetricItem> {
  constructor(private readonly prisma: PrismaService) {}

  async insert(
    entity: IDistributingMetricItem,
  ): Promise<IDistributingMetricItem> {
    const { id, user, category, baseCurrency, ...preparedData } = entity;
    let categoryToConnect = null;
    let userToConnect = null;
    let currencyToConnect = null;
    if (category !== null) {
      categoryToConnect = { connect: { id: category.id } };
    }
    if (user !== null) {
      userToConnect = { connect: { id: user.id } };
    }
    if (baseCurrency !== null) {
      currencyToConnect = { connect: { id: baseCurrency.id } };
    }
    const createdMetric = await this.prisma.distributing_metric_items.create({
      data: Object.assign(
        preparedData,
        { currencies: currencyToConnect },
        { user_credentials: userToConnect },
        { transaction_categories: categoryToConnect },
      ),
    });
    return {
      id: createdMetric.id,
      metric: createdMetric.metric,
      period: createdMetric.period as any,
      user: await this.getRelatedEntity(createdMetric.id, 'user'),
      category: (await this.getRelatedEntity(
        createdMetric.id,
        'category',
      )) as ITransactionCategory,
      baseCurrency: (await this.getRelatedEntity(
        createdMetric.id,
        'baseCurrency',
      )) as ICurrency,
    };
  }

  findAll(
    page: number,
    perPage: number,
    orderBy: OrderCriteria<IDistributingMetricItem>,
    searchCriteria: Criteria<IDistributingMetricItem>,
  ): Promise<IDistributingMetricItem[]> {
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<IDistributingMetricItem> {
    const result = await this.prisma.distributing_metric_items.findOne({
      where: { id },
    });
    return {
      id: result.id,
      metric: result.metric,
      period: result.period as any,
      user: await this.getRelatedEntity(result.id, 'user'),
      category: (await this.getRelatedEntity(
        result.id,
        'category',
      )) as ITransactionCategory,
      baseCurrency: (await this.getRelatedEntity(
        result.id,
        'baseCurrency',
      )) as ICurrency,
    };
  }

  findOneByAndCriteria(
    searchCriteria: Criteria<IDistributingMetricItem>,
  ): Promise<IDistributingMetricItem> {
    throw new Error('Not implemented');
  }

  async findByAndCriteria(
    searchCriteria: Criteria<IDistributingMetricItem>,
  ): Promise<IDistributingMetricItem[]> {
    const queryData: {
      where?: distributing_metric_itemsWhereInput;
    } = { where: {} };
    Object.keys(searchCriteria).forEach((key: string): void => {
      switch (key) {
        case 'user':
          if (searchCriteria[key]) {
            queryData.where.userId = searchCriteria[key]
              ? searchCriteria[key].id
              : null;
          }
          break;
        case 'category':
          queryData.where.transactionCategoryId = searchCriteria[key]
            ? searchCriteria[key].id
            : null;
          break;
        case 'baseCurrency':
          queryData.where.currencyId = searchCriteria[key]
            ? searchCriteria[key].id
            : null;
          break;
        default:
          queryData.where[key] = searchCriteria[key];
          break;
      }
    });
    const metrics = await this.prisma.distributing_metric_items.findMany(
      queryData,
    );
    const result: IDistributingMetricItem[] = [];
    for await (const m of metrics) {
      result.push({
        id: m.id,
        metric: m.metric,
        period: m.period as any,
        user: await this.getRelatedEntity(m.id, 'user'),
        category: (await this.getRelatedEntity(
          m.id,
          'category',
        )) as ITransactionCategory,
        baseCurrency: (await this.getRelatedEntity(
          m.id,
          'baseCurrency',
        )) as ICurrency,
      });
    }
    return result;
  }

  findByOrCriteria(
    searchCriteria: Criteria<IDistributingMetricItem>,
  ): Promise<IDistributingMetricItem[]> {
    throw new Error('Not implemented');
  }

  update(
    updateData: Criteria<IDistributingMetricItem>,
    id: string,
  ): Promise<any> {
    throw new Error('Not implemented');
  }

  async delete(
    deleteCriteria: Criteria<IDistributingMetricItem>,
  ): Promise<any> {
    const metricsForDelete: IDistributingMetricItem[] = await this.findByAndCriteria(
      deleteCriteria,
    );
    const { range, ...criteria } = deleteCriteria;
    await this.prisma.distributing_metric_items.deleteMany({ where: criteria });
    return metricsForDelete;
  }

  getRelatedEntity(
    id: string,
    fieldName: keyof IDistributingMetricItem,
  ): Promise<any> {
    switch (fieldName) {
      case 'category':
        return (this.prisma.distributing_metric_items
          .findOne({ where: { id } })
          .transaction_categories() as unknown) as Promise<
          ITransactionCategory
        >;
      case 'baseCurrency':
        return (this.prisma.distributing_metric_items
          .findOne({ where: { id } })
          .currencies() as unknown) as Promise<ICurrency>;
      case 'user':
        return (this.prisma.distributing_metric_items
          .findOne({ where: { id } })
          .user_credentials() as unknown) as Promise<IUserCredential>;
      default:
        throw new Error(`${fieldName} of class doesn't have object type`);
    }
  }

  async getRelatedEntities(
    id: string,
    fieldName: keyof IDistributingMetricItem,
  ): Promise<any[]> {
    throw new Error('Not implemented');
  }
}
