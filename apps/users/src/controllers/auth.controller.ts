import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Inject,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import UserRegisterDto from '../dtos/userRegister.dto';
import UserLoginDto from '../dtos/userLogin.dto';

// import SessionsManagementInputPort from '@app/users/ports/sessionsManagementInput.port';
import UserCredentialsManagementInputPort from '@app/users/ports/userCredentialsManagementInput.port';
import IUserCredential from '@app/users/entities/userCredential.interface';

import IUser from '@domain/users/entities/user.interface';

import JwtAuthGuard from '@common/guards/jwt-auth.guard';
import {
  INVALID_TOKEN_MSG,
  INVALID_USER_MSG,
  OTP_IS_INVALID_MSG,
  SUCH_USER_ALREADY_EXISTS_MSG,
  USER_IS_NOT_ACTIVE_MSG,
  USER_IS_NOT_FOUND_MSG,
} from '@common/constants/errorMessages.constants';

import ISecuredUserCredential from '@persistance/entities/securedUserCredential';

import { User } from '@common/decorators/user.decorator';
import PasswordlessSessionManagementInputPort from '@app/users/ports/passwordlessSessionManagementInput.port';

@ApiTags('Authorization and profile management')
@ApiUnauthorizedResponse({
  schema: {
    type: 'string',
    examples: [
      'Incorrect token',
      INVALID_USER_MSG,
      USER_IS_NOT_ACTIVE_MSG,
      INVALID_TOKEN_MSG,
    ],
  },
})
@ApiForbiddenResponse({
  schema: {
    type: 'string',
    example: 'This user doesn`t have any of these groups',
  },
})
@Controller('auth')
export default class AuthController {
  constructor(
    @Inject('SessionsManagementInputPort&UserCredentialsManagementInputPort')
    private readonly authorityInputPort: PasswordlessSessionManagementInputPort &
      // SessionsManagementInputPort &
      UserCredentialsManagementInputPort,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ description: 'Get profile info about current user' })
  @ApiOkResponse({
    description: 'user info',
    schema: {
      properties: {
        email: { type: 'string' },
        profileImageUrl: { type: 'string', nullable: true },
        roles: { type: 'array', items: { type: 'string' } },
        isActive: { type: 'boolean' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@User() user: ISecuredUserCredential) {
    const { id, /*passwordHash*/ otp, ...result } = user;
    return result;
  }

  @ApiOperation({ description: 'Create new user in the system' })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: SUCH_USER_ALREADY_EXISTS_MSG,
    },
  })
  @ApiCreatedResponse({
    description: 'created user',
    status: 201,
    schema: {
      properties: {
        email: { type: 'string' },
        profileImageUrl: { type: 'string', nullable: true },
        roles: { type: 'array', items: { type: 'string' } },
        isActive: { type: 'boolean' },
      },
    },
  })
  @Post('signUp')
  signUp(@Body() payload: UserRegisterDto): Promise<IUserCredential> {
    return this.authorityInputPort.signUp(payload);
  }

  @ApiOperation({ description: 'Send to user`s email their otp' })
  @ApiCreatedResponse({
    description: 'status',
    status: 200,
  })
  @Post('sendOtp/:email')
  sendOtp(@Param('email') email: string): Promise<string> {
    return this.authorityInputPort.sendOtp(email);
  }

  @ApiOperation({ description: 'Get API access token for existing user' })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      // examples: [USER_IS_NOT_FOUND_MSG, 'Password is invalid!'],
      examples: [USER_IS_NOT_FOUND_MSG, OTP_IS_INVALID_MSG],
    },
  })
  @ApiCreatedResponse({
    description: 'access token for API access',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
        },
      },
    },
  })
  @Post('signIn')
  signIn(@Body() payload: UserLoginDto): Promise<{ accessToken: string }> {
    return this.authorityInputPort.signIn(payload);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Change profile image url for current user' })
  @ApiBody({
    schema: {
      properties: {
        newPath: {
          type: 'string',
        },
      },
      example: {
        newPath: 'url',
      },
    },
  })
  @ApiOkResponse({
    description: 'created user',
    status: 200,
    schema: {
      properties: {
        email: { type: 'string' },
        profileImageUrl: { type: 'string', nullable: true },
        roles: { type: 'array', items: { type: 'string' } },
        isActive: { type: 'boolean' },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Patch('changeProfileImage')
  changeProfileImageMethod(
    @User() user: IUser,
    @Body() { newPath }: { newPath: string },
  ): Promise<IUserCredential> {
    return this.authorityInputPort.changeProfileImage(user, newPath);
  }

  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete current user from the system' })
  @ApiOkResponse({
    description: 'deleting result',
    status: 200,
    schema: {
      type: 'boolean',
    },
  })
  @UseGuards(JwtAuthGuard)
  @Delete('deleteAccount')
  deleteAccount(@User() user: IUser): Promise<boolean> {
    return this.authorityInputPort.deleteAccount(user);
  }
}
