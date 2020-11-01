import IDistributingMetricItem from '@app/transactions/entities/distributingMetricItem.interface';
import ReportDistributionOutputPort from '@app/transactions/ports/reportDistributionOutput.port';

import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

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
