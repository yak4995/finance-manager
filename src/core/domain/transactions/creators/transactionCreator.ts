import { Criteria } from '../../repository.interface';
import ITransaction from '../entities/transaction.interface';

// Probably children: TypeOrmTransactionCreator, MongoTransactionObjectCreator, XMLTransactionCreator
export default interface ITransactionCreator {
  getInstance(fields: Criteria<ITransaction>): ITransaction;
}
