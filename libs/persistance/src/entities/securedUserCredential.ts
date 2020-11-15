import IUserCredential from '@app/users/entities/userCredential.interface';

export default interface ISecuredUserCredential extends IUserCredential {
  // passwordHash: string;
  otp: string;
  lastLoginDate: Date;
}
