import IUserCredential from '../entities/userCredential.interface';
import { Criteria } from '../../../domain/repository.interface';

export default interface IUserCredentialCreator {
  getInstance(fields: Criteria<IUserCredential>): IUserCredential;
}
