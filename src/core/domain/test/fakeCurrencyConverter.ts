import ICurrencyConverter from '../transactions/currencyConverter.interface';

export default class FakeCurrencyConverter implements ICurrencyConverter {
  getRateFor(from: string, to: string, forDate: Date): number {
    return from !== to ? 0.8 : 1.0;
  }
}
