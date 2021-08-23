import ICurrency from './entities/currency.interface';

export default interface ICurrenciesFacade {
  findById(id: any, metadata?: any): Promise<ICurrency>;
  findByCode(code: any, metadata?: any): Promise<ICurrency>;
  getRateFor(...args: any[]): Promise<any>;
}
