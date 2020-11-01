import IEventListener from '@app/events/eventListener.interface';
import ReportHasBeenGeneratedEvent from '@app/transactions/events/reportHasBeenGenerated.event';

import { AvailableAnalyticMetric } from '@domain/transactions/enums/availableAnalyticMetric.enum';

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ReportHasBeenGeneratedListener
  implements IEventListener<ReportHasBeenGeneratedEvent> {
  constructor(private readonly mailService: MailerService) {}

  async process(event: ReportHasBeenGeneratedEvent): Promise<any> {
    const { result, ...eventData } = event;
    const metricName = Object.keys(AvailableAnalyticMetric).filter(
      key => typeof AvailableAnalyticMetric[key] === 'number',
    )[eventData.item.metric.toString()];
    return this.mailService.sendMail({
      to: event.item.user.email,
      subject: 'Finance Manager Report',
      template: 'report',
      context: {
        data: eventData,
        result: JSON.stringify(result),
        metricName,
      },
    });
  }
}
