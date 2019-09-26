import IPersistantEntity from '../persistantEntity';

// Probably children: TypeOrmCurrencyEntity, XMLCurrencyEntity
export default interface ICurrency extends IPersistantEntity {
  name: string;
  code: string;
}
