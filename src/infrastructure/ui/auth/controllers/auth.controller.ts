import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import AuthorityInteractor from '../../../../core/app/users/interactors/authority.interactor';
import UserCredentialAbstractFactory from '../../../../core/app/users/factories/userCredentialFactory';
import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../../../../core/app/users/events/userHasBeenCreated.event';
import AuthorityOutputPort from '../../../../core/app/users/ports/authorityOutput.port';
import UserRegisterDto from '../../../../core/app/users/dto/userRegister.dto';
import UserLoginDto from '../../../../core/app/users/dto/userLogin.dto';
import { User } from '../decorators/user.decorator';
import IUser from '../../../../core/domain/users/entities/user.interface';

@Controller('auth')
export class AuthController extends AuthorityInteractor {
  constructor(
    authService: AuthService,
    userCredentialFactory: UserCredentialAbstractFactory,
    @Inject('UserHasBeenCreatedEventDispatchService')
    authEventDispatcher: IEventDispatchService<UserHasBeenCreatedEvent>,
    @Inject('AuthorityOutputPort')
    authOutputPort: AuthorityOutputPort,
  ) {
    super(
      authService,
      userCredentialFactory.createUserCredentialRepo(),
      authEventDispatcher,
      authOutputPort,
    );
  }

  @Post('signUp')
  signUp(@Body() payload: UserRegisterDto) {
    return super.signUp(payload);
  }

  @Post('signIn')
  signIn(@Body() payload: UserLoginDto) {
    return super.signIn(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changeProfileImage')
  changeProfileImageMethod(
    @User() user: IUser,
    @Body() { newPath }: { newPath: string },
  ) {
    return super.changeProfileImage(user, newPath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteAccount')
  deleteAccount(@User() user: IUser) {
    return super.deleteAccount(user);
  }
}
