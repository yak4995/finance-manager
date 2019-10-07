import UserRegisterDto from '../dto/userRegister.dto';
import UserLoginDto from '../dto/userLogin.dto';
import IUser from '../../../domain/users/entities/user.interface';
import IUserCredential from '../entities/userCredential.interface';

// use auth service from infrastructure
// (because, for example, SSO\OAuth2\(Passwordless\biometric) auth doesn`t required password, only redirection;
// 2FA required one more step for auth; also we have Auth0 service or Basic auth:
// The .htaccess file references a .htpasswd file in which each line contains of a username and a password
// separated by a colon (":"). You can not see the actual passwords as they are encrypted (md5 in this case).
// Then client needs to transfer a login and pass in the URL: https://username:password@www.example.com (DEPRECATED)
// )
export default interface IAuthorityService {
  signUp(payload: UserRegisterDto): Promise<IUserCredential>;
  signIn(payload: UserLoginDto): Promise<IUserCredential>;
  signOut(user: IUser): Promise<boolean>;
  deleteAccount(user: IUser): Promise<boolean>;
}
