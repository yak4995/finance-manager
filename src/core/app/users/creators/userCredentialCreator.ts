import IUserCredential from '../entities/userCredential.interface';
import { Criteria } from '../../../domain/repository.interface';

// Probably children: TypeOrmUserCredentialCreator, MongoUserCredentialObjectCreator, XMLUserCredentialCreator
export default interface IUserCredentialCreator {
  getInstance(fields: Criteria<IUserCredential>): IUserCredential;
}
