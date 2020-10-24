import { Injectable, InternalServerErrorException } from '@nestjs/common';
import IDistributingMetricItem from '../../../../core/app/transactions/entities/distributingMetricItem.interface';
import { TransactionsComparisonDto } from '../../../../core/domain/transactions/dto/transactionsComparison.dto';
import ReportDistributionOutputPort from '../../../../core/app/transactions/ports/reportDistributionOutput.port';

@Injectable()
export class DefReportDistributionOutputPort
  implements ReportDistributionOutputPort {
  async processMetricSubscribing(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async processMetricUnsubscribing(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }

  async processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }
}
