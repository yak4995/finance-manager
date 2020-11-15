import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import IUserCredential from '@app/users/entities/userCredential.interface';

import JwtPayloadInterface from '@common/interfaces/jwt-payload.interface';

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
      throw new UnauthorizedException('User token is invalid or expired');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active!');
    }
    return user;
  }
}
