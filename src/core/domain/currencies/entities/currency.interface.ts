import IPersistantEntity from '../../persistantEntity';

// Probably children: TypeOrmCurrencyEntity, MongooseCurrencySchema, XMLCurrencyEntity
export default interface ICurrency extends IPersistantEntity {
  name: string;
  code: string;
}
