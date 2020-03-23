import IUserCredential from 'core/app/users/entities/userCredential.interface';

export default interface ISecuredUserCredential extends IUserCredential {
  passwordHash: string;
}
