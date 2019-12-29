import { Criteria } from '../../repository.interface';
import ITransaction from '../entities/transaction.interface';
import EntityCreator from '../../entityCreator.interface';

// Probably children: TypeOrmTransactionCreator, MongoTransactionObjectCreator, XMLTransactionCreator
export default interface ITransactionCreator
  extends EntityCreator<ITransaction> {
  getInstance(fields: Criteria<ITransaction>): ITransaction;
}
