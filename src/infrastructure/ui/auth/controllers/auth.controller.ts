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
import { User } from '../decorators/user.decorator';
import IUser from '../../../../core/domain/users/entities/user.interface';
import UserRegiisterDto from '../dtos/userRegister.dto';
import UserLoginDto from '../dtos/userLogin.dto';
import SessionsManagementInputPort from '../../../../core/app/users/ports/sessionsManagementInput.port';
import UserCredentialsManagementInputPort from '../../../../core/app/users/ports/userCredentialsManagementInput.port';

// TODO: outside auth provider like auth0 with passwordless
@Controller('auth')
export default class AuthController {
  constructor(
    @Inject('SessionsManagementInputPort&UserCredentialsManagementInputPort')
    private readonly authorityInputPort: SessionsManagementInputPort &
      UserCredentialsManagementInputPort,
  ) {}

  @Post('signUp')
  signUp(@Body() payload: UserRegiisterDto) {
    return this.authorityInputPort.signUp(payload);
  }

  @Post('signIn')
  signIn(@Body() payload: UserLoginDto) {
    return this.authorityInputPort.signIn(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changeProfileImage')
  changeProfileImageMethod(
    @User() user: IUser,
    @Body() { newPath }: { newPath: string },
  ) {
    return this.authorityInputPort.changeProfileImage(user, newPath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteAccount')
  deleteAccount(@User() user: IUser) {
    return this.authorityInputPort.deleteAccount(user);
  }
}
