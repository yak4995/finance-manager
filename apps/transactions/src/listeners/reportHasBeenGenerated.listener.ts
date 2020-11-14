import * as fs from 'fs';
import * as generate from 'node-chartist';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import IEventListener from '@app/events/eventListener.interface';
import ReportHasBeenGeneratedEvent from '@app/transactions/events/reportHasBeenGenerated.event';

import { AvailableAnalyticMetric } from '@domain/transactions/enums/availableAnalyticMetric.enum';
import { TransactionsComparisonDto } from '@domain/transactions/dto/transactionsComparison.dto';

import { TransactionCategoriesFacade } from '../facades/transactionCategories.facade';

@Injectable()
export default class ReportHasBeenGeneratedListener
  implements IEventListener<ReportHasBeenGeneratedEvent> {
  constructor(
    private readonly mailService: MailerService,
    private readonly categoriesFacade: TransactionCategoriesFacade,
  ) {}

  async process(event: ReportHasBeenGeneratedEvent): Promise<any> {
    const { result, ...data } = event;
    const metricName = Object.keys(AvailableAnalyticMetric).filter(
      key => typeof AvailableAnalyticMetric[key] === 'number',
    )[data.item.metric.toString()];
    let chart = '';
    let labels = [];
    let series = [];
    const style = `<style>${fs
      .readFileSync(process.cwd() + '/node_modules/node-chartist/dist/main.css')
      .toString()}</style>`;
    switch (event.item.metric) {
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_RATIO_BY_CATEGORY_AND_DATE_RANGE:
      case AvailableAnalyticMetric.TRANSACTIONS_SUM_RATIO_BY_CATEGORY_AND_DATE_RANGE:
        labels = (
          await Promise.all(
            Object.keys(result as TransactionsComparisonDto)
              .filter(key => result[key] !== 0)
              .map(id => this.categoriesFacade.findById(id)),
          )
        ).map(category => category.name);
        series = Object.values(result as TransactionsComparisonDto)
          .filter(value => value !== 0)
          .map((value, index) => ({ name: labels[index], value }));
        chart =
          (await generate(
            'pie',
            {
              width: 400,
              height: 200,
            },
            {
              labels,
              series,
            },
          )) + style;
        break;
      case AvailableAnalyticMetric.TRANSACTIONS_COUNT_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
      case AvailableAnalyticMetric.TRANSACTIONS_SUM_CHANGE_BY_CATEGORY_AND_DATE_RANGE:
        labels = Object.keys(result as TransactionsComparisonDto);
        series = [
          Object.values(result as TransactionsComparisonDto).map(
            value => value / 100,
          ),
        ];
        chart =
          (await generate(
            'bar',
            {
              width: 2000,
              height: 500,
              seriesBarDistance: 30,
              axisX: { title: 'Date', offset: 50 },
              axisY: { title: 'Count/sum', offset: 50 },
            },
            {
              labels,
              series,
            },
          )) + style;
        break;
    }
    return this.mailService.sendMail({
      to: event.item.user.email,
      subject: 'Finance Manager Report',
      template: 'report',
      context: {
        data,
        chart,
        metricName,
      },
    });
  }
}
