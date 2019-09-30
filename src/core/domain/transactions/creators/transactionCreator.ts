import { Criteria } from '../../repository.interface';
import ITransaction from '../entities/transaction.interface';

export default interface ITransactionCreator {
  getInstance(fields: Criteria<ITransaction>): ITransaction;
}
