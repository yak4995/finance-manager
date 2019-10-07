import ReportDistributionInputPort from '../ports/reportDistributionInput.port';
import ReportDistributionOutputPort from '../ports/reportDistributionOutput.port';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import IRepository from '../../../domain/repository.interface';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import TransactionAnalyticService from '../../../domain/transactions/services/transactionAnalyticService';
import { AvailableAnalyticMetric } from '../../../domain/transactions/enums/availableAnalyticMetric.enum';
import IEventDispatchService from '../../events/eventDispatchService.interface';
import ReportHasBeenGeneratedEvent from '../events/reportHasBeenGenerated.event';
import { Period } from 'src/core/domain/period/enums/period.enum';

export class ReportDistributionInteractor
  implements ReportDistributionInputPort {
  constructor(
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

  public async subscribe(items: IDistributingMetricItem[]): Promise<void> {
    try {
      await Promise.all(
        items.map(item => this.distributionMetricItemRepo.insert(item)),
      );
      await this.outputPort.processMetricSubscribing(items);
    } catch (e) {
      await this.outputPort.processMetricSubscribing(null);
    }
  }

  public async unsubscribe(items: IDistributingMetricItem[]): Promise<void> {
    try {
      await Promise.all(
        items.map(item =>
          this.distributionMetricItemRepo.delete({ id: item.id }),
        ),
      );
      await this.outputPort.processMetricUnsubscribing(items);
    } catch (e) {
      await this.outputPort.processMetricUnsubscribing(null);
    }
  }

  public async send(item: IDistributingMetricItem): Promise<void> {
    const transactions = await this.transactionsRepo.findByAndCriteria({
      owner: item.user,
    });
    this.transactionAnalyticService.transactions = transactions;
    let message = null;
    const startDate = new Date();
    switch (item.period) {
      case Period.MONTH:
        if (startDate.getMonth() > 1) {
          startDate.setMonth(startDate.getMonth() - 1);
        } else {
          startDate.setFullYear(startDate.getFullYear() - 1);
          startDate.setMonth(11);
        }
        break;
      case Period.QUARTER:
        if (startDate.getMonth() == 1) {
          throw new Error('Quarter has not been ended yet!');
        }
        if (startDate.getMonth() == 0) {
          startDate.setFullYear(startDate.getFullYear() - 1);
          startDate.setMonth(8);
        } else if (startDate.getMonth() == 2) {
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
    const endDate = new Date();
    switch (item.metric) {
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsCountBy(
          item.category,
          startDate,
          endDate,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUMT_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsSumBy(
          item.category,
          startDate,
          endDate,
          item.baseCurrency,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsCountForDateRange(
          startDate,
          endDate,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUMT_BY_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsSumForDateRange(
          startDate,
          endDate,
          item.baseCurrency,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionCountRatioByCategories(
          item.category,
          startDate,
          endDate,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionSumRatioByCategories(
          item.category,
          startDate,
          endDate,
          item.baseCurrency,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionCountChangeByPeriod(
          item.category,
          startDate,
          endDate,
          item.period,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionSumChangeByPeriod(
          item.category,
          startDate,
          endDate,
          item.period,
          item.baseCurrency,
        );
        break;
    }
    await Promise.all([
      this.eventDispatcher.emit(new ReportHasBeenGeneratedEvent(item, message)),
      this.outputPort.processSending(item, message),
    ]);
  }
}
