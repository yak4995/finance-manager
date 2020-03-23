import SessionsManagementInputPort from '../ports/sessionsManagementInput.port';
import AuthorityOutputPort from '../ports/authorityOutput.port';
import UserCredentialsManagementInputPort from '../ports/userCredentialsManagementInput.port';
import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UserRegisterDto from '../dto/userRegister.dto';
import UserLoginDto from '../dto/userLogin.dto';
import IRepository from '../../../domain/repository.interface';
import IUserCredential from '../entities/userCredential.interface';
import IAuthorityService from '../interfaces/authorityService.interface';
import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../events/userHasBeenCreated.event';

export default class AuthorityInteractor
  implements SessionsManagementInputPort, UserCredentialsManagementInputPort {
  constructor(
    private readonly authorityService: IAuthorityService,
    private readonly userCredentialRepo: IRepository<IUserCredential>,
    private readonly eventDispatcher: IEventDispatchService<
      UserHasBeenCreatedEvent
    >,
    private readonly outputPort: AuthorityOutputPort,
  ) {}

  // TODO: queue, mailing, outside auth provider

  public async signUp(payload: UserRegisterDto): Promise<any> {
    try {
      await this.userCredentialRepo.findOneByAndCriteria({
        email: payload.email,
      });
    } catch (e) {
      let savedUser: IUserCredential = null,
        mailingResult: boolean = false;
      try {
        const registrationResult: IUserCredential = await this.authorityService.signUp(
          payload,
        );
        if (registrationResult) {
          mailingResult = await this.eventDispatcher.emit(
            new UserHasBeenCreatedEvent(registrationResult),
          );
        }
        savedUser = await this.userCredentialRepo.insert(registrationResult);
      } catch (e2) {
        return this.outputPort.processRegistration(null, false, e2);
      }
      return this.outputPort.processRegistration(
        savedUser,
        mailingResult,
        null,
      );
    }
    return this.outputPort.processRegistration(
      null,
      false,
      new Error('Such user already exists'),
    );
  }

  public async signIn(payload: UserLoginDto): Promise<any> {
    try {
      const [loginResult, foundUser]: [
        IUserCredential,
        IUserCredential,
      ] = await Promise.all([
        this.authorityService.signIn(payload),
        this.userCredentialRepo.findOneByAndCriteria({
          email: payload.email,
        }),
      ]);
      return this.outputPort.processLogin(loginResult, null);
    } catch (e) {
      return this.outputPort.processLogin(null, e);
    }
  }

  public async signOut(user: IUser): Promise<any> {
    try {
      const result: boolean = await this.authorityService.signOut(user);
      return this.outputPort.processLogout(user, result, null);
    } catch (e) {
      return this.outputPort.processLogout(null, false, e);
    }
  }

  public async changeAccountInfo(
    user: IUser,
    payload: UserInfoDto,
  ): Promise<any> {
    try {
      await this.userCredentialRepo.update(
        {
          roles: payload.roles,
          isActive: payload.isActive,
          email: payload.email,
        },
        user.id,
      );
      return this.outputPort.processAccountInfoChanging(user, null);
    } catch (e) {
      return this.outputPort.processAccountInfoChanging(null, e);
    }
  }

  public async changeProfileImage(
    user: IUser,
    newProfileImagePath: string,
  ): Promise<any> {
    try {
      await this.userCredentialRepo.update(
        { profileImageUrl: newProfileImagePath },
        user.id,
      );
      return this.outputPort.processAccountProfileImageChanging(
        Object.assign(user, { profileImageUrl: newProfileImagePath }),
        null,
      );
    } catch (e) {
      return this.outputPort.processAccountProfileImageChanging(null, e);
    }
  }

  public async deleteAccount(user: IUser): Promise<any> {
    try {
      const result: boolean = await this.authorityService.deleteAccount(user);
      return this.outputPort.processAccountDeleting(user, result, null);
    } catch (e) {
      return this.outputPort.processAccountDeleting(user, false, e);
    }
  }
}
