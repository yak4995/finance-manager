import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import IUserCredential from '@app/users/entities/userCredential.interface';
import { Roles } from '@app/users/enums/roles.enum';

// import AuthService from '@common/services/auth.service';
import PasswordlessAuthService from '@common/services/passwordlessAuth.sevice';
import { INVALID_USER_MSG } from '@common/constants/errorMessages.constants';

@Injectable()
export default class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    // private readonly authService: AuthService,
    private readonly authService: PasswordlessAuthService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext().req;
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
    const request = this.getRequest(context);
    const tokenHeader: string = request.headers.authorization;
    const token: string = tokenHeader.slice('Bearer '.length).trim();
    const user: IUserCredential = this.authService.decodeToken(
      token,
    ) as IUserCredential;
    if (!user) {
      throw new UnauthorizedException(INVALID_USER_MSG);
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
