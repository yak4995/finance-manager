export default interface ICurrencyConverter {
  getRateFor(from: string, to: string, forDate: Date): number;
}
