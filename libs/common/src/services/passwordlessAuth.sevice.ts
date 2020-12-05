import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';

// import IAuthorityService from '@app/users/interfaces/authorityService.interface';
import IPasswordlessAuthorityService from '@app/users/interfaces/passwordlessAuthorityService.interface';
import UserCredentialAbstractFactory from '@app/users/factories/userCredentialFactory';
import IUserRegisterDto from '@app/users/dto/iUserRegister.dto';
import IUserCredential from '@app/users/entities/userCredential.interface';
import IUserLoginDto from '@app/users/dto/iUserLogin.dto';

import IUser from '@domain/users/entities/user.interface';
import IRepository, { Criteria } from '@domain/repository.interface';

import ISecuredUserCredential from '@persistance/entities/securedUserCredential';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import JwtPayloadInterface from '@common/interfaces/jwt-payload.interface';

@Injectable()
export default class PasswordlessAuthService
  implements IPasswordlessAuthorityService {
  private readonly userCredentialRepo: IRepository<ISecuredUserCredential>;

  constructor(
    private readonly userCredentialFactory: UserCredentialAbstractFactory,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {
    this.userCredentialRepo = userCredentialFactory.createUserCredentialRepo() as IRepository<
      ISecuredUserCredential
    >;
  }

  public async signUp(payload: IUserRegisterDto): Promise<IUserCredential> {
    return this.userCredentialFactory.createUserCredential({
      email: payload.email,
    } as Criteria<IUserCredential>);
  }

  public async sendOtp(email: string): Promise<string> {
    try {
      const user: ISecuredUserCredential = await this.userCredentialRepo.findOneByAndCriteria(
        { email },
      );
      const otp = Math.random()
        .toString(36)
        .substring(6);
      await this.userCredentialRepo.update(
        {
          otp,
          lastLoginDate: new Date(),
        },
        user.id,
      );
      await this.mailService.sendMail({
        to: email,
        subject: 'Finance Manager OTP',
        template: 'otp',
        context: { otp },
      });
      return 'Otp has been sent';
    } catch (e) {
      FileLoggerService.error(
        e.message,
        e.stack,
        'PasswordlessAuthService::sendOtp',
      );
      throw e;
    }
  }

  public async signIn(payload: IUserLoginDto): Promise<IUserCredential> {
    const user: ISecuredUserCredential = await this.userCredentialRepo.findOneByAndCriteria(
      {
        email: payload.email,
      },
    );
    if (user) {
      const isOtpValid: boolean =
        moment().diff(user.lastLoginDate ?? new Date(), 'minutes') < 10 &&
        payload.authorityData === user.otp;
      if (!isOtpValid) {
        throw new UnauthorizedException('Otp is invalid!');
      }
      await this.userCredentialRepo.update(
        {
          lastLoginDate: new Date(),
          otp: null,
        },
        user.id,
      );
      return user;
    } else {
      return null;
    }
  }

  public signOut(_user: IUserCredential): never {
    throw new Error('Method not implemented.');
  }

  public async deleteAccount(user: IUser): Promise<boolean> {
    try {
      await this.userCredentialRepo.delete({ id: user.id });
      return true;
    } catch (e) {
      FileLoggerService.error(e.message, e.stack, 'AuthService::deleteAccount');
      return false;
    }
  }

  public async validateUser(
    payload: JwtPayloadInterface,
  ): Promise<IUserCredential> {
    return this.userCredentialRepo.findById(payload.id);
  }

  public async createToken(
    jwtPayload: JwtPayloadInterface,
  ): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jwtService.signAsync(jwtPayload, {
        expiresIn: this.configService.get('JWT_TOKEN_EXPIRES_IN'),
      }),
    };
  }

  public decodeToken(token: string): string | { [key: string]: any } {
    return this.jwtService.decode(token);
  }
}
