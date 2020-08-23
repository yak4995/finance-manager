import ICurrencyConverterService from '../../../../core/domain/transactions/services/currencyConverterService.interface';
import {
  Injectable,
  HttpService,
  InternalServerErrorException,
} from '@nestjs/common';
import { parseStringPromise } from 'xml2js';
import * as moment from 'moment';

@Injectable()
export default class CurrencyConverterService
  implements ICurrencyConverterService {
  constructor(private readonly httpService: HttpService) {}

  async getRateFor(_from: string, to: string, forDate: Date): Promise<number> {
    if (to === 'UAH') {
      return 1;
    }
    const result = await this.httpService
      .get(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${to}&date=${moment(
          forDate,
        ).format('YYYYMMDD')}`,
      )
      .toPromise();
    if (result.data) {
      const parsedResult = await parseStringPromise(result.data);
      return Number(parsedResult.exchange.currency[0].rate[0]);
    } else {
      new InternalServerErrorException('NBU resurce is not allowed');
    }
  }
}