import {
  Injectable,
  HttpService,
  InternalServerErrorException,
} from '@nestjs/common';
import { parseStringPromise } from 'xml2js';
import * as moment from 'moment';

import ICurrencyConverterService from '@domain/currencies/services/currencyConverterService.interface';

import { NBU_IS_NOT_AVAILABLE_MSG } from '@common/constants/errorMessages.constants';

@Injectable()
export default class CurrencyConverterService
  implements ICurrencyConverterService {
  constructor(private readonly httpService: HttpService) {}

  async getRateFor(from: string, to: string, forDate: Date): Promise<number> {
    if (from === 'UAH') {
      return 1;
    }
    const result = await this.httpService
      .get(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${from}&date=${moment(
          forDate,
        ).format('YYYYMMDD')}`,
      )
      .toPromise();
    if (result.data) {
      const parsedResult = await parseStringPromise(result.data);
      return Number(parsedResult.exchange.currency[0].rate[0]);
    } else {
      new InternalServerErrorException(NBU_IS_NOT_AVAILABLE_MSG);
    }
  }
}
