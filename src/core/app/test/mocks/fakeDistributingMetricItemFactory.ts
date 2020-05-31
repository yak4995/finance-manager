import DistributingMetricItemAbstractFactory from '../../transactions/factories/distributingMetricItemFactory';
import IDistributingMetricItem from '../../transactions/entities/distributingMetricItem.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';
import FakeRepo from '../../../domain/test/mocks/fakeRepo';
import EntityCreator from '../../../domain/entityCreator.interface';

/* istanbul ignore next */
export default class FakeDistributingMetricItemFactory extends DistributingMetricItemAbstractFactory {
  constructor(
    private readonly distributingMetricItems: IDistributingMetricItem[],
    distributingMetricItemCreator: EntityCreator<IDistributingMetricItem>,
  ) {
    super(distributingMetricItemCreator);
  }
  createDistributingMetricItem(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem {
    return super.createDistributingMetricItem(fields);
  }
  createDistributingMetricItemRepo(): IRepository<IDistributingMetricItem> {
    return new FakeRepo<IDistributingMetricItem>(this.distributingMetricItems);
  }
}
