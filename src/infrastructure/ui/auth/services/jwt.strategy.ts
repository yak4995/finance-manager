import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { AuthService } from './auth.service';
import IUserCredential from '../../../../core/app/users/entities/userCredential.interface';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const user: IUserCredential | null = await this.authService.validateUser(
      payload,
    );
    if (!user) {
      throw new UnauthorizedException('User token is invalid or expired');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active!');
    }
    return user;
  }
}
