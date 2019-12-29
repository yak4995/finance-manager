import ICurrencyConverterService from '../transactions/services/currencyConverterService.interface';

export default class FakeCurrencyConverter
  implements ICurrencyConverterService {
  async getRateFor(from: string, to: string, forDate: Date): Promise<number> {
    return from !== to ? 0.8 : 1.0;
  }
}
