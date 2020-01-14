import SessionsManagementInputPort from '../ports/sessionsManagementInput.port';
import AuthorityOutputPort from '../ports/authorityOutput.port';
import UserCredentialsManagementInputPort from '../ports/userCredentialsManagementInput.port';
import IUser from '../../../domain/users/entities/user.interface';
import UserInfoDto from '../dto/userInfo.dto';
import UserRegisterDto from '../dto/userRegister.dto';
import UserLoginDto from '../dto/userLogin.dto';
import IRepository from '../../../domain/repository.interface';
import IUserCredential from '../entities/userCredential.interface';
import EntityFactory from '../../entityFactory';
import IAuthorityService from '../interfaces/authorityService.interface';
import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../events/userHasBeenCreated.event';

// TODO: handle errors
export default class AuthorityInteractor
  implements SessionsManagementInputPort, UserCredentialsManagementInputPort {
  constructor(
    private readonly authorityService: IAuthorityService,
    private readonly entityFactory: EntityFactory,
    private readonly userCredentialRepo: IRepository<IUserCredential>,
    private readonly eventDispatcher: IEventDispatchService<
      UserHasBeenCreatedEvent
    >,
    private readonly outputPort: AuthorityOutputPort,
  ) {}

  public async signUp(payload: UserRegisterDto): Promise<any> {
    try {
      await this.userCredentialRepo.findOneByAndCriteria({
        email: payload.email,
      });
    } catch (e) {
      const createdUser: IUserCredential = this.entityFactory.createUserCredential(
        {
          email: payload.email,
        },
      );
      let registrationResult: IUserCredential = null,
        savedUser: IUserCredential = null,
        mailingResult: boolean = false;
      try {
        [registrationResult, savedUser] = await Promise.all([
          this.authorityService.signUp(payload),
          this.userCredentialRepo.insert(createdUser),
        ]);
        if (registrationResult) {
          mailingResult = await this.eventDispatcher.emit(
            new UserHasBeenCreatedEvent(savedUser),
          );
        }
      } catch (e2) {
        throw e2;
      }
      return this.outputPort.processRegistration(
        savedUser,
        mailingResult,
        null,
      );
    }
    return this.outputPort.processRegistration(null, false, null);
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
      return this.outputPort.processLogin(null, null);
    }
  }

  public async signOut(user: IUser): Promise<any> {
    try {
      const result: boolean = await this.authorityService.signOut(user);
      return this.outputPort.processLogout(user, result, null);
    } catch (e) {
      return this.outputPort.processLogout(null, false, null);
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
      return this.outputPort.processAccountInfoChanging(null, null);
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
      return this.outputPort.processAccountProfileImageChanging(user, null);
    } catch (e) {
      return this.outputPort.processAccountProfileImageChanging(null, null);
    }
  }

  public async deleteAccount(user: IUser): Promise<any> {
    try {
      const result: boolean = await this.authorityService.deleteAccount(user);
      return this.outputPort.processAccountDeleting(user, result, null);
    } catch (e) {
      return this.outputPort.processAccountDeleting(user, false, null);
    }
  }
}
