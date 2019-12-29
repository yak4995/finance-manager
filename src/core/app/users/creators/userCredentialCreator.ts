import IUserCredential from '../entities/userCredential.interface';
import { Criteria } from '../../../domain/repository.interface';
import EntityCreator from '../../../domain/entityCreator.interface';

// Probably children: TypeOrmUserCredentialCreator, MongoUserCredentialObjectCreator, XMLUserCredentialCreator
export default interface IUserCredentialCreator
  extends EntityCreator<IUserCredential> {
  getInstance(fields: Criteria<IUserCredential>): IUserCredential;
}
