import { Injectable, Inject } from '@nestjs/common';
import EntityCreator from '../../../core/domain/entityCreator.interface';
import IRepository from '../../../core/domain/repository.interface';
import DistributingMetricItemAbstractFactory from '../../../core/app/transactions/factories/distributingMetricItemFactory';
import IDistributingMetricItem from '../../../core/app/transactions/entities/distributingMetricItem.interface';

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
