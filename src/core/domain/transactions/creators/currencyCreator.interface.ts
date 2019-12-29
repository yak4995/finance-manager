import ICurrency from '../entities/currency.interface';
import { Criteria } from '../../repository.interface';
import EntityCreator from '../../entityCreator.interface';

// Probably children: TypeOrmCurrencyCreator, MongoCurrencyObjectCreator, XMLCurrencyCreator
export default interface ICurrencyCreator extends EntityCreator<ICurrency> {
  getInstance(fields: Criteria<ICurrency>): ICurrency;
}
