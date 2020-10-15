import ICurrency from '../../domain/currencies/entities/currency.interface';

export default interface ICurrenciesFacade {
  findById(id: string): Promise<ICurrency>;
}
