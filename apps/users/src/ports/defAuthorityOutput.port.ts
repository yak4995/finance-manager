import { BadRequestException, Injectable } from '@nestjs/common';

import AuthorityOutputPort from '@app/users/ports/authorityOutput.port';
import IUserCredential from '@app/users/entities/userCredential.interface';

import IUser from '@domain/users/entities/user.interface';

import ISecuredUserCredential from '@persistance/entities/securedUserCredential';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import AuthService from '@common/services/auth.service';

@Injectable()
export default class DefAuthorityOutputPort implements AuthorityOutputPort {
  constructor(private readonly authService: AuthService) {}

  processLogin(
    user: ISecuredUserCredential,
    e: Error,
  ): Promise<{ accessToken: string }> {
    if (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefAuthorityOutputPort::processLogin',
      );
      throw new BadRequestException(e.message);
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
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefAuthorityOutputPort::processRegistration',
      );
      throw new BadRequestException(e.message);
    }
    if (!mailingResult) {
      FileLoggerService.error(
        'Mail has not been sent!',
        null,
        'DefAuthorityOutputPort::processRegistration',
      );
    }
    const { passwordHash, ...result } = savedUser;
    return result;
  }

  processLogout(_user: IUser, _logoutResult: boolean, _e: Error): never {
    throw new Error('Method not implemented.');
  }

  processAccountInfoChanging(_user: IUser, _e: Error): never {
    throw new Error('Method not implemented.');
  }

  async processAccountProfileImageChanging(
    user: ISecuredUserCredential,
    e: Error,
  ): Promise<IUser> {
    if (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefAuthorityOutputPort::processAccountProfileImageChanging',
      );
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
      FileLoggerService.error(
        e.message,
        e.stack,
        'DefAuthorityOutputPort::processAccountDeleting',
      );
      throw new BadRequestException(e.message);
    }
    if (!deletingResult) {
      throw new BadRequestException(
        'task for user deletion has not been added to queue',
      );
    }
    return deletingResult;
  }
}
