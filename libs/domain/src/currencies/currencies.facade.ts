import ICurrency from './entities/currency.interface';

export default interface ICurrenciesFacade {
  findById(id: any): Promise<ICurrency>;
  findByCode(code: any): Promise<ICurrency>;
  getRateFor(...args: any[]): Promise<any>;
}
