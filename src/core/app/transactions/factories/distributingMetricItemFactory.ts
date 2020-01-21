import EntityCreator from '../../../domain/entityCreator.interface';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import IRepository, { Criteria } from '../../../domain/repository.interface';

// For instantiating objects of related classes without their source dependency
// we use abstract class instead of interface
// because in this case we interested in private field and some implementation details
export default abstract class DistributingMetricItemAbstractFactory {
  protected constructor(
    private distributingMetricItemCreator: EntityCreator<
      IDistributingMetricItem
    >,
  ) {}

  public static setInstance(instance: DistributingMetricItemAbstractFactory) {
    this.instance = instance;
  }

  protected static instance: DistributingMetricItemAbstractFactory = null;

  /* istanbul ignore next */
  public static getInstance(): DistributingMetricItemAbstractFactory {
    if (this.instance !== null) {
      return this.instance;
    }
    return null;
  }

  public createDistributingMetricItem(
    fields: Criteria<IDistributingMetricItem>,
  ): IDistributingMetricItem {
    return this.distributingMetricItemCreator.getInstance(fields);
  }

  public abstract createDistributingMetricItemRepo(): IRepository<
    IDistributingMetricItem
  >;
}
