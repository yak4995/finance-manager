import ReportDistributionInputPort from '../ports/reportDistributionInput.port';
import ReportDistributionOutputPort from '../ports/reportDistributionOutput.port';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import IRepository from '../../../domain/repository.interface';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import TransactionAnalyticService from '../../../domain/transactions/services/transactionAnalyticService';
import { AvailableAnalyticMetric } from '../../../domain/transactions/enums/availableAnalyticMetric.enum';
import IEventDispatchService from '../../events/eventDispatchService.interface';
import ReportHasBeenGeneratedEvent from '../events/reportHasBeenGenerated.event';
import { Period } from '../../../domain/period/enums/period.enum';
import { TransactionsComparisonDto } from '../../../domain/transactions/dto/transactionsComparison.dto';

export default class ReportDistributionInteractor
  implements ReportDistributionInputPort {
  constructor(
    // TODO: заменить на DistributingMetricItemAbstractFactory для увеличения связности и уменьшения зацепления
    // (+ в диаграмме)
    private readonly distributionMetricItemRepo: IRepository<
      IDistributingMetricItem
    >,
    private readonly transactionsRepo: IRepository<ITransaction>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly eventDispatcher: IEventDispatchService<
      ReportHasBeenGeneratedEvent
    >,
    private readonly outputPort: ReportDistributionOutputPort,
  ) {}

  public async subscribe(items: IDistributingMetricItem[]): Promise<any> {
    try {
      await Promise.all(
        items.map(
          (item: IDistributingMetricItem): Promise<IDistributingMetricItem> =>
            this.distributionMetricItemRepo.insert(item),
        ),
      );
      return this.outputPort.processMetricSubscribing(items, null);
    } catch (e) {
      return this.outputPort.processMetricSubscribing(null, e);
    }
  }

  public async unsubscribe(items: IDistributingMetricItem[]): Promise<any> {
    try {
      await Promise.all(
        items.map(
          (item: IDistributingMetricItem): Promise<IDistributingMetricItem> =>
            this.distributionMetricItemRepo.delete({ id: item.id }),
        ),
      );
      return this.outputPort.processMetricUnsubscribing(items, null);
    } catch (e) {
      return this.outputPort.processMetricUnsubscribing(null, e);
    }
  }

  public async send(item: IDistributingMetricItem): Promise<any> {
    try {
      const transactions: ITransaction[] = await this.transactionsRepo.findByAndCriteria(
        {
          owner: item.user,
        },
      );
      this.transactionAnalyticService.transactions = transactions;
      let message: number | TransactionsComparisonDto = null;
      const [startDate, endDate] = this.defineDateRange(item.period);
      switch (item.metric) {
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsCountBy(
            item.category,
            startDate,
            endDate,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsSumBy(
            item.category,
            startDate,
            endDate,
            item.baseCurrency,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsCountForDateRange(
            startDate,
            endDate,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsSumForDateRange(
            startDate,
            endDate,
            item.baseCurrency,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionCountRatioByCategories(
            item.category,
            startDate,
            endDate,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionSumRatioByCategories(
            item.category,
            startDate,
            endDate,
            item.baseCurrency,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionCountChangeByPeriod(
            item.category,
            startDate,
            endDate,
            item.period,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionSumChangeByPeriod(
            item.category,
            startDate,
            endDate,
            item.period,
            item.baseCurrency,
          );
          break;
      }
      await this.eventDispatcher.emit(
        new ReportHasBeenGeneratedEvent(item, message),
      );
      return this.outputPort.processSending(item, message, null);
    } catch (e) {
      return this.outputPort.processSending(item, null, e);
    }
  }

  /* istanbul ignore next */
  private defineDateRange(period: Period): [Date, Date] {
    const startDate: Date = new Date();
    switch (period) {
      case Period.MONTH:
        if (startDate.getMonth() > 1) {
          startDate.setMonth(startDate.getMonth() - 1);
        } else {
          startDate.setFullYear(startDate.getFullYear() - 1);
          startDate.setMonth(11);
        }
        break;
      case Period.QUARTER:
        if (startDate.getMonth() === 1) {
          throw new Error('Quarter has not been ended yet!');
        }
        if (startDate.getMonth() === 0) {
          startDate.setFullYear(startDate.getFullYear() - 1);
          startDate.setMonth(8);
        } else if (startDate.getMonth() === 2) {
          startDate.setFullYear(startDate.getFullYear() - 1);
          startDate.setMonth(11);
        } else {
          startDate.setMonth(startDate.getMonth() - 3);
        }
        break;
      case Period.YEAR:
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }
    const endDate: Date = new Date();
    return [startDate, endDate];
  }
}
