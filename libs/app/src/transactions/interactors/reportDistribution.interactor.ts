import ReportDistributionInputPort from '../ports/reportDistributionInput.port';
import ReportDistributionOutputPort from '../ports/reportDistributionOutput.port';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import IEventDispatchService from '../../events/eventDispatchService.interface';
import ReportHasBeenGeneratedEvent from '../events/reportHasBeenGenerated.event';
import DistributingMetricItemAbstractFactory from '../factories/distributingMetricItemFactory';

import IRepository from '@domain/repository.interface';
import ITransaction from '@domain/transactions/entities/transaction.interface';
import TransactionAnalyticService from '@domain/transactions/services/transactionAnalyticService';
import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';
import { AvailableAnalyticMetric } from '@domain/transactions/enums/availableAnalyticMetric.enum';
import { Period } from '@domain/period/enums/period.enum';

import { QUARTER_ERROR_MSG } from '@common/constants/errorMessages.constants';

export default class ReportDistributionInteractor
  implements ReportDistributionInputPort {
  private readonly distributionMetricItemRepo: IRepository<
    IDistributingMetricItem
  >;

  constructor(
    private readonly distributionMetricItemFactory: DistributingMetricItemAbstractFactory,
    private readonly transactionsRepo: IRepository<ITransaction>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly eventDispatcher: IEventDispatchService<
      ReportHasBeenGeneratedEvent
    >,
    private readonly outputPort: ReportDistributionOutputPort,
  ) {
    this.distributionMetricItemRepo = this.distributionMetricItemFactory.createDistributingMetricItemRepo();
  }

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
      const [startDate, endDate] = this.defineDateRange(item.period);
      const transactions: ITransaction[] = await this.transactionsRepo.findByAndCriteria(
        {
          owner: item.user,
          range: {
            field: 'datetime',
            from: startDate,
            to: endDate,
          },
        },
      );
      this.transactionAnalyticService.transactions = transactions;
      let message: number | TransactionsComparisonDto = null;
      // TODO: to strategy?
      switch (item.metric) {
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsCountBy(
            item.category,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsSumBy(
            item.category,
            item.baseCurrency,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsCount();
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_BY_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionsSum(
            item.baseCurrency,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionCountRatioByCategories(
            item.category,
          );
          break;
        case AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE:
          message = await this.transactionAnalyticService.getTransactionSumRatioByCategories(
            item.category,
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
    // TODO: to strategy?
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
          throw new Error(QUARTER_ERROR_MSG);
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
