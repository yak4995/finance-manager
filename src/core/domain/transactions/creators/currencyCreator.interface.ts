import ICurrency from '../entities/currency.interface';
import { Criteria } from '../../repository.interface';

// Probably children: TypeOrmCurrencyEntityCreator, XMLCurrencyEntityCreator
export default interface ICurrencyCreator {
  getInstance(fields: Criteria<ICurrency>): ICurrency;
}
