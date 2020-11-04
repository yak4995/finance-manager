import IDistributingMetricItem from '@app/transactions/entities/distributingMetricItem.interface';
import DistributingMetricItemAbstractFactory from '@app/transactions/factories/distributingMetricItemFactory';

import EntityCreator from '@domain/entityCreator.interface';
import IRepository from '@domain/repository.interface';

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export default class DistributingMetricItemFactory extends DistributingMetricItemAbstractFactory {
  constructor(
    @Inject('DistributingMetricItemRepositoryForFactory')
    private readonly distributingMetricItemRepository: IRepository<
      IDistributingMetricItem
    >,
    @Inject('DistributingMetricItemCreator')
    distributingMetricItemCreator: EntityCreator<IDistributingMetricItem>,
  ) {
    super(distributingMetricItemCreator);
  }

  public createDistributingMetricItemRepo(): IRepository<
    IDistributingMetricItem
  > {
    return this.distributingMetricItemRepository;
  }
}
