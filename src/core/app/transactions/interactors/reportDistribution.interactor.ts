import ReportDistributionInputPort from '../ports/reportDistributionInput.port';
import ReportDistributionOutputPort from '../ports/reportDistributionOutput.port';
import IDistributingMetricItem from '../entities/distributingMetricItem.interface';
import EntityFactory from '../../entityFactory';
import IRepository from '../../../domain/repository.interface';
import ITransportService from '../../transportService.interface';
import ITransaction from '../../../domain/transactions/entities/transaction.interface';
import TransactionAnalyticService from '../../../domain/transactions/services/transactionAnalyticService';

export class ReportDistributionInteractor
  implements ReportDistributionInputPort {
  constructor(
    private readonly entityFactory: EntityFactory,
    private readonly transactionsRepo: IRepository<ITransaction>,
    private readonly transactionAnalyticService: TransactionAnalyticService,
    private readonly transportService: ITransportService,
    private readonly outputPort: ReportDistributionOutputPort,
  ) {}

  public async subscribe(
    destination: string,
    items: IDistributingMetricItem[],
  ): Promise<void> {
    // we should use outputPort methods
  }

  public async unsubscribe(
    destination: string,
    items: IDistributingMetricItem[],
  ): Promise<void> {
    // we should use outputPort methods
  }

  public async send(destination: string, data: any): Promise<void> {
    // we should use outputPort methods
  }
}
