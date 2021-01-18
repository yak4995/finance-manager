import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import IUserCredential from '@app/users/entities/userCredential.interface';

import JwtPayloadInterface from '@common/interfaces/jwt-payload.interface';
import {
  INVALID_TOKEN_MSG,
  USER_IS_NOT_ACTIVE_MSG,
} from '@common/constants/errorMessages.constants';

import PasswordlessAuthService from './passwordlessAuth.sevice';
// import AuthService from './auth.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    // private readonly authService: AuthService,
    private readonly authService: PasswordlessAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<IUserCredential> {
    const user: IUserCredential = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException(INVALID_TOKEN_MSG);
    }
    if (!user.isActive) {
      throw new UnauthorizedException(USER_IS_NOT_ACTIVE_MSG);
    }
    return user;
  }
}
