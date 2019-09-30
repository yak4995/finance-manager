import IPersistantEntity from '../../../domain/persistantEntity';
import IUserCredential from './userCredential.interface';

export default interface ICredentialsRecoveryToken extends IPersistantEntity {
  token: string;
  user: IUserCredential;
}
