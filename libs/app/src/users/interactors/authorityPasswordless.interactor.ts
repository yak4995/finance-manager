import AuthorityOutputPort from '../ports/authorityOutput.port';
import UserCredentialsManagementInputPort from '../ports/userCredentialsManagementInput.port';
import IUserInfoDto from '../dto/iUserInfo.dto';
import IUserRegisterDto from '../dto/iUserRegister.dto';
import IUserLoginDto from '../dto/iUserLogin.dto';
import IUserCredential from '../entities/userCredential.interface';
// import IAuthorityService from '../interfaces/authorityService.interface';
import IPasswordlessAuthorityService from '../interfaces/passwordlessAuthorityService.interface';
import IEventDispatchService from '../../events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../events/userHasBeenCreated.event';
import UserShouldBeDeletedEvent from '../events/userShouldBeDeleted.event';

import IRepository from '@domain/repository.interface';
import IUser from '@domain/users/entities/user.interface';
import PasswordlessSessionManagementInputPort from '../ports/passwordlessSessionManagementInput.port';

import { SUCH_USER_ALREADY_EXISTS_MSG } from '@common/constants/errorMessages.constants';

export default class AuthorityPasswordlessInteractor
  implements
    PasswordlessSessionManagementInputPort,
    UserCredentialsManagementInputPort {
  constructor(
    private readonly authorityService: IPasswordlessAuthorityService,
    private readonly userCredentialRepo: IRepository<IUserCredential>,
    private readonly userCreatedEventDispatcher: IEventDispatchService<
      UserHasBeenCreatedEvent
    >,
    private readonly userForDeleteEventDispatcher: IEventDispatchService<
      UserShouldBeDeletedEvent
    >,
    private readonly outputPort: AuthorityOutputPort,
  ) {}

  public async signUp(payload: IUserRegisterDto): Promise<any> {
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
          mailingResult = await this.userCreatedEventDispatcher.emit(
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
      new Error(SUCH_USER_ALREADY_EXISTS_MSG),
    );
  }

  public async sendOtp(email: string): Promise<string> {
    return this.authorityService.sendOtp(email);
  }

  public async signIn(payload: IUserLoginDto): Promise<any> {
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
    payload: IUserInfoDto,
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
      const result: boolean = await this.userForDeleteEventDispatcher.emit(
        new UserShouldBeDeletedEvent(user),
      );
      return this.outputPort.processAccountDeleting(user, result, null);
    } catch (e) {
      return this.outputPort.processAccountDeleting(user, false, e);
    }
  }
}
