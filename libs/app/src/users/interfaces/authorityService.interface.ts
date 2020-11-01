import IUserRegisterDto from '../dto/iUserRegister.dto';
import IUserLoginDto from '../dto/iUserLogin.dto';
import IUserCredential from '../entities/userCredential.interface';

import IUser from '@domain/users/entities/user.interface';

// use auth service from infrastructure
// (because, for example, SSO\OAuth2\(Passwordless\biometric) auth doesn`t required password, only redirection;
// 2FA required one more step for auth; also we have Auth0 service or Basic auth:
// The .htaccess file references a .htpasswd file in which each line contains of a username and a password
// separated by a colon (":"). You can not see the actual passwords as they are encrypted (md5 in this case).
// Then client needs to transfer a login and pass in the URL: https://username:password@www.example.com (DEPRECATED)
// )
export default interface IAuthorityService {
  signUp(payload: IUserRegisterDto): Promise<IUserCredential>;
  signIn(payload: IUserLoginDto): Promise<IUserCredential>;
  signOut(user: IUser): Promise<boolean>;
  deleteAccount(user: IUser): Promise<boolean>;
}
