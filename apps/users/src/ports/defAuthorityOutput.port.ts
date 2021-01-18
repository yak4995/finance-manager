import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import AuthorityOutputPort from '@app/users/ports/authorityOutput.port';
import IUserCredential from '@app/users/entities/userCredential.interface';

import IUser from '@domain/users/entities/user.interface';

import ISecuredUserCredential from '@persistance/entities/securedUserCredential';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

// import AuthService from '@common/services/auth.service';
import PasswordlessAuthService from '@common/services/passwordlessAuth.sevice';
import {
  METHOD_IS_NOT_IMPLEMENTED_MSG,
  OTP_IS_INVALID_MSG,
  SUCH_USER_ALREADY_EXISTS_MSG,
} from '@common/constants/errorMessages.constants';

@Injectable()
export default class DefAuthorityOutputPort implements AuthorityOutputPort {
  // constructor(private readonly authService: AuthService) {}
  constructor(private readonly authService: PasswordlessAuthService) {}

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
      if (e.message === OTP_IS_INVALID_MSG) {
        throw new UnauthorizedException(e.message);
      } else {
        throw new BadRequestException(e.message);
      }
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
      if (e.message === SUCH_USER_ALREADY_EXISTS_MSG) {
        throw new BadRequestException(e.message);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
    if (!mailingResult) {
      FileLoggerService.error(
        'Mail has not been sent!',
        null,
        'DefAuthorityOutputPort::processRegistration',
      );
    }
    const { /*passwordHash*/ otp, ...result } = savedUser;
    return result;
  }

  processLogout(_user: IUser, _logoutResult: boolean, _e: Error): never {
    throw new Error(METHOD_IS_NOT_IMPLEMENTED_MSG);
  }

  processAccountInfoChanging(_user: IUser, _e: Error): never {
    throw new Error(METHOD_IS_NOT_IMPLEMENTED_MSG);
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
      throw new InternalServerErrorException(e.message);
    }
    const { /*passwordHash*/ otp, ...result } = user;
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
      throw new InternalServerErrorException(e.message);
    }
    if (!deletingResult) {
      throw new BadRequestException(
        'task for user deletion has not been added to queue',
      );
    }
    return deletingResult;
  }
}
