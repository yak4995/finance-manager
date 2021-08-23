import IDistributingMetricItem from '@app/transactions/entities/distributingMetricItem.interface';
import ReportDistributionOutputPort from '@app/transactions/ports/reportDistributionOutput.port';

import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';

import { INTERNAL_SERVER_ERROR_MSG } from '@common/constants/errorMessages.constants';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as cls from 'cls-hooked';

@Injectable()
export class DefReportDistributionOutputPort
  implements ReportDistributionOutputPort {
  async processGetUserSubscriptions(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefReportDistributionOutputPort::processGetUserSubscriptions',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async processMetricSubscribing(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefReportDistributionOutputPort::processMetricSubscribing',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async processMetricUnsubscribing(
    result: IDistributingMetricItem[],
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefReportDistributionOutputPort::processMetricUnsubscribing',
      );
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MSG);
    }

    return result;
  }

  async processSending(
    item: IDistributingMetricItem,
    result: number | TransactionsComparisonDto,
    e: Error,
  ): Promise<any> {
    if (e) {
      FileLoggerService.error(
        `requestId: ${(
          cls.getNamespace('transactions') ?? { get: (_: string) => 'test' }
        ).get('requestId')}; ${e.message}`,
        e.stack,
        'DefReportDistributionOutputPort::processSending',
      );
      throw new InternalServerErrorException(e.message);
    }

    return result;
  }
}
