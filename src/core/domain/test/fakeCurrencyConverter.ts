import ICurrencyConverterService from '../transactions/services/currencyConverterService.interface';
import ICurrency from '../transactions/entities/currency.interface';

export const fakeCurrency: ICurrency = {
  id: '1',
  name: 'USD',
  code: 'USD',
};

export const fakeBaseCurrency: ICurrency = {
  id: '2',
  name: 'EUR',
  code: 'EUR',
};

export default class FakeCurrencyConverter
  implements ICurrencyConverterService {
  async getRateFor(from: string, to: string, forDate: Date): Promise<number> {
    return from !== to ? 0.8 : 1.0;
  }
}
