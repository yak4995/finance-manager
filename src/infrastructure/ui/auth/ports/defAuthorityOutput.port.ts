import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import AuthorityOutputPort from '../../../../core/app/users/ports/authorityOutput.port';
import IUserCredential from '../../../../core/app/users/entities/userCredential.interface';
import IUser from '../../../../core/domain/users/entities/user.interface';
import ISecuredUserCredential from '../../../persistance/entities/securedUserCredential';
import { AuthService } from '../services/auth.service';

@Injectable()
export default class DefAuthorityOutputPort implements AuthorityOutputPort {
  constructor(private readonly authService: AuthService) {}

  processLogin(
    user: ISecuredUserCredential,
    e: Error,
  ): Promise<{ accessToken: string }> {
    if (e) {
      throw e;
    }
    return this.authService.createToken({
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      roles: user.roles,
    });
  }

  async processRegistration(
    savedUser: ISecuredUserCredential,
    mailingResult: boolean,
    e: Error,
  ): Promise<IUserCredential> {
    if (e) {
      throw new BadRequestException(e.message);
    }
    if (!mailingResult) {
      Logger.error(
        'Mail has not been sent!',
        e.stack,
        'DefAuthorityOutputPort',
      );
    }
    const { passwordHash, ...result } = savedUser;
    return result;
  }

  processLogout(
    _user: IUser,
    _logoutResult: boolean,
    _e: Error,
  ): Promise<never> {
    throw new Error('Method not implemented.');
  }

  async processAccountInfoChanging(_user: IUser, _e: Error): Promise<never> {
    throw new Error('Method not implemented.');
  }

  async processAccountProfileImageChanging(
    user: ISecuredUserCredential,
    e: Error,
  ): Promise<IUser> {
    if (e) {
      throw new BadRequestException(e.message);
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  async processAccountDeleting(
    _user: IUser,
    deletingResult: boolean,
    e: Error,
  ): Promise<boolean> {
    if (e) {
      throw new BadRequestException(e.message);
    }
    return deletingResult;
  }
}
