import ICurrencyConverterService from '../transactions/services/currencyConverterService.interface';

export default class FakeCurrencyConverter
  implements ICurrencyConverterService {
  getRateFor(from: string, to: string, forDate: Date): number {
    return from !== to ? 0.8 : 1.0;
  }
}
