import ICurrency from './entities/currency.interface';

export default interface ICurrenciesFacade {
  findById(id: string): Promise<ICurrency>;
}
