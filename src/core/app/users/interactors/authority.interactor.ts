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

export class AuthorityInteractor
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

  public async signUp(payload: UserRegisterDto): Promise<void> {
    try {
      await this.userCredentialRepo.findOneByAndCriteria({
        email: payload.email,
      });
    } catch (e) {
      const createdUser = this.entityFactory.createUserCredential({
        email: payload.email,
      });
      try {
        const [registrationResult, savedUser] = await Promise.all([
          this.authorityService.signUp(payload),
          this.userCredentialRepo.insert(createdUser),
        ]);
        let mailingResult: boolean = false;
        if (registrationResult) {
          mailingResult = await this.eventDispatcher.emit(
            new UserHasBeenCreatedEvent(savedUser),
          );
        }
        await this.outputPort.processRegistration(savedUser, mailingResult);
      } catch (e2) {
        await this.outputPort.processRegistration(null, false);
      }
      return;
    }
    await this.outputPort.processRegistration(null, false);
  }

  public async signIn(payload: UserLoginDto): Promise<void> {
    try {
      const [loginResult, foundUser] = await Promise.all([
        this.authorityService.signIn(payload),
        this.userCredentialRepo.findOneByAndCriteria({
          email: payload.email,
        }),
      ]);
      await this.outputPort.processLogin(loginResult);
    } catch (e) {
      await this.outputPort.processLogin(null);
    }
  }

  public async signOut(user: IUser): Promise<void> {
    try {
      const result = await this.authorityService.signOut(user);
      await this.outputPort.processLogout(user, result);
    } catch (e) {
      await this.outputPort.processLogout(null, false);
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
      await this.outputPort.processAccountInfoChanging(user);
    } catch (e) {
      await this.outputPort.processAccountInfoChanging(null);
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
      await this.outputPort.processAccountProfileImageChanging(user);
    } catch (e) {
      await this.outputPort.processAccountProfileImageChanging(null);
    }
  }

  public async deleteAccount(user: IUser): Promise<void> {
    try {
      const result = await this.authorityService.deleteAccount(user);
      await this.outputPort.processAccountDeleting(user, result);
    } catch (e) {
      await this.outputPort.processAccountProfileImageChanging(null);
    }
  }
}
