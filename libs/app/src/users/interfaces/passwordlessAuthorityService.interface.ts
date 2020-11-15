import IAuthorityService from './authorityService.interface';

export default interface IPasswordlessAuthorityService
  extends IAuthorityService {
  sendOtp(email: string): Promise<string>;
}
