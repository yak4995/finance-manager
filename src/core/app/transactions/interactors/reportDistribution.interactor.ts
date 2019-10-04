import ReportDistributionInputPort from '../ports/reportDistributionInput.port';
import ReportDistributionOutputPort from '../ports/reportDistributionOutput.port';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import IRepository from '../../../domain/repository.interface';
import ITransportService from '../../transportService.interface';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import TransactionAnalyticService from '../../../domain/transactions/services/transactionAnalyticService';
import { AvailableAnalyticMetric } from '../../../domain/transactions/enums/availableAnalyticMetric.enum';

export class ReportDistributionInteractor
  implements ReportDistributionInputPort {
  constructor(
    private readonly distributionMetricItemRepo: IRepository<
      IDistributingMetricItem
    >,
    private readonly transactionsRepo: IRepository<ITransaction>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly transportService: ITransportService,
    private readonly outputPort: ReportDistributionOutputPort,
  ) {}

  public async subscribe(
    items: IDistributingMetricItem[],
  ): Promise<void> {
    try {
      await Promise.all(
        items.map(item => this.distributionMetricItemRepo.insert(item)),
      );
      this.outputPort.processMetricSubscribing(items);
    } catch (e) {
      this.outputPort.processMetricSubscribing(null);
    }
  }

  public async unsubscribe(
    items: IDistributingMetricItem[],
  ): Promise<void> {
    try {
      await Promise.all(
        items.map(item =>
          this.distributionMetricItemRepo.delete({ id: item.id }),
        ),
      );
      this.outputPort.processMetricUnsubscribing(items);
    } catch (e) {
      this.outputPort.processMetricUnsubscribing(null);
    }
  }

  public async send(item: IDistributingMetricItem): Promise<void> {
    const transactions = await this.transactionsRepo.findByAndCriteria({
      owner: item.user,
    });
    this.transactionAnalyticService.transactions = transactions;
    let message = null;
    switch (item.metric) {
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsCountBy(
          item.category,
          new Date(),
          new Date(),
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUMT_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsSumBy(
          item.category,
          new Date(),
          new Date(),
          item.baseCurrency,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_BY_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsCountForDateRange(
          new Date(),
          new Date(),
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUMT_BY_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionsSumForDateRange(
          new Date(),
          new Date(),
          item.baseCurrency,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionCountRatioByCategories(
          item.category,
          new Date(),
          new Date(),
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionSumRatioByCategories(
          item.category,
          new Date(),
          new Date(),
          item.baseCurrency,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionCountChangeByPeriod(
          item.category,
          new Date(),
          new Date(),
          item.period,
        );
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
        message = this.transactionAnalyticService.getTransactionSumChangeByPeriod(
          item.category,
          new Date(),
          new Date(),
          item.period,
          item.baseCurrency,
        );
        break;
    }
    this.transportService.unicast(message, item.user.email);
    this.outputPort.processSending();
  }
}
