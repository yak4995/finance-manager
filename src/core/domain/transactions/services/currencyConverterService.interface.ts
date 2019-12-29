export default interface ICurrencyConverterService {
  getRateFor(from: string, to: string, forDate: Date): Promise<number>;
}
