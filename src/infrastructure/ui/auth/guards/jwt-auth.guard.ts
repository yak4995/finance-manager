import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../../../core/app/users/enums/roles.enum';
import AuthService from '../services/auth.service';
import IUserCredential from '../../../../core/app/users/entities/userCredential.interface';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivateByToken: boolean = await (super.canActivate(
      context,
    ) as Promise<boolean>);
    if (!canActivateByToken) {
      return false;
    }
    let roles: Roles[] =
      this.reflector.get<Roles[]>('roles', context.getHandler()) ||
      this.reflector.get<Roles[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const tokenHeader: string = request.headers.authorization;
    const token: string = tokenHeader.slice('Bearer '.length).trim();
    const user: IUserCredential = this.authService.decodeToken(
      token,
    ) as IUserCredential;
    if (!user) {
      throw new UnauthorizedException('User from token is invalid!');
    }
    const hasRole = (): boolean =>
      user.roles.some((userRole: Roles): boolean => roles.includes(userRole));
    const granted: boolean =
      user && user.roles && user.roles.length > 0 && hasRole();
    if (!granted) {
      throw new ForbiddenException(
        `This user doesn\`t have any of these groups: [${roles.join(',')}]`,
      );
    }
    return granted;
  }
}
