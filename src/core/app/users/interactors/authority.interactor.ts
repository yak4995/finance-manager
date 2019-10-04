import SessionsManagementInputPort from '../ports/sessionsManagementInput.port';
import AuthorityOutputPort from '../ports/authorityOutput.port';
import UserCredentialsManagementInputPort from '../ports/userCredentialsManagementInput.port';
import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UserRegisterDto from '../dto/userRegister.dto';
import UserLoginDto from '../dto/userLogin.dto';
import IRepository from '../../../domain/repository.interface';
import IUserCredential from '../entities/userCredential.interface';
import ITransportService from '../../transportService.interface';
import EntityFactory from '../../entityFactory';
import IAuthorityService from '../interfaces/authorityService.interface';

export class AuthorityInteractor
  implements SessionsManagementInputPort, UserCredentialsManagementInputPort {
  constructor(
    private readonly authorityService: IAuthorityService,
    private readonly entityFactory: EntityFactory,
    private readonly userCredentialRepo: IRepository<IUserCredential>,
    private readonly transportService: ITransportService,
    private readonly outputPort: AuthorityOutputPort,
  ) {}

  public async signUp(payload: UserRegisterDto): Promise<void> {
    try {
      await this.userCredentialRepo.findOneByAndCriteria({
        email: payload.email,
      });
    } catch (e) {
      // use auth service from infrastructure
      // (because, for example, SSO\OAuth2\(Passwordless\biometric) auth doesn`t required password, only redirection;
      // 2FA required one more step for auth; also we have Auth0 service or Basic auth:
      // The .htaccess file references a .htpasswd file in which each line contains of a username and a password
      // separated by a colon (":"). You can not see the actual passwords as they are encrypted (md5 in this case).
      // Then client needs to transfer a login and pass in the URL: https://username:password@www.example.com (DEPRECATED)
      // )
      const createdUser = this.entityFactory.createUserCredential({
        email: payload.email,
      });
      try {
        const [registrationResult, savedUser] = await Promise.all([
          this.authorityService.signUp(payload),
          this.userCredentialRepo.insert(createdUser),
        ]);
        let mailingResult = false;
        if (registrationResult) {
          mailingResult = await this.transportService.unicast(
            'You has been registered successfully',
            createdUser.email,
          );
        }
        this.outputPort.processRegistration(savedUser, mailingResult);
      } catch (e2) {
        this.outputPort.processRegistration(null, false);
      }
      return;
    }
    this.outputPort.processRegistration(null, false);
  }

  public async signIn(payload: UserLoginDto): Promise<void> {
    try {
      const [loginResult] = await Promise.all([
        this.authorityService.signIn(payload),
        this.userCredentialRepo.findOneByAndCriteria({
          email: payload.email,
        }),
      ]);
      this.outputPort.processLogin(loginResult);
    } catch (e) {
      this.outputPort.processLogin(null);
    }
  }

  public async signOut(user: IUser): Promise<void> {
    try {
      const result = await this.authorityService.signOut(user);
      this.outputPort.processLogout(user, result);
    } catch (e) {
      this.outputPort.processLogout(null, false);
    }
  }

  public async changeAccountInfo(
    user: IUser,
    payload: UserInfoDto,
  ): Promise<void> {
    try {
      await this.userCredentialRepo.update(
        {
          roles: payload.roles,
          isActive: payload.isActive,
          email: payload.email,
        },
        user.id,
      );
      this.outputPort.processAccountInfoChanging(user);
    } catch (e) {
      this.outputPort.processAccountInfoChanging(null);
    }
  }

  public async changeProfileImage(
    user: IUser,
    newProfileImagePath: string,
  ): Promise<void> {
    try {
      await this.userCredentialRepo.update(
        { profileImageUrl: newProfileImagePath },
        user.id,
      );
      this.outputPort.processAccountProfileImageChanging(user);
    } catch (e) {
      this.outputPort.processAccountProfileImageChanging(null);
    }
  }

  public async deleteAccount(user: IUser): Promise<void> {
    try {
      const result = await this.authorityService.deleteAccount(user);
      this.outputPort.processAccountDeleting(user, result);
    } catch (e) {
      this.outputPort.processAccountProfileImageChanging(null);
    }
  }
}
