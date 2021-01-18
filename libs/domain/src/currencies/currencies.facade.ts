import { Metadata } from 'grpc';
import ICurrency from './entities/currency.interface';

export default interface ICurrenciesFacade {
  findById(id: any, metadata?: Metadata): Promise<ICurrency>;
  findByCode(code: any, metadata?: Metadata): Promise<ICurrency>;
  getRateFor(...args: any[]): Promise<any>;
}
