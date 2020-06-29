import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  Inject,
  Get,
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
import { User } from '../../../decorators/user.decorator';
import IUser from '../../../../core/domain/users/entities/user.interface';
import UserRegisterDto from '../dtos/userRegister.dto';
import UserLoginDto from '../dtos/userLogin.dto';
import SessionsManagementInputPort from '../../../../core/app/users/ports/sessionsManagementInput.port';
import UserCredentialsManagementInputPort from '../../../../core/app/users/ports/userCredentialsManagementInput.port';
import IUserCredential from '../../../../core/app/users/entities/userCredential.interface';
import ISecuredUserCredential from '../../../persistance/entities/securedUserCredential';
import JwtAuthGuard from '../guards/jwt-auth.guard';

// TODO: outside auth provider like auth0 with passwordless
@ApiTags('Authorization and profile management')
@ApiUnauthorizedResponse({
  schema: {
    type: 'string',
    examples: [
      'Incorrect token',
      'User from token is invalid!',
      'User is not active!',
      'User token is invalid or expired',
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
    private readonly authorityInputPort: SessionsManagementInputPort &
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
    const { id, passwordHash, ...result } = user;
    return result;
  }

  @ApiOperation({ description: 'Create new user in the system' })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      example: 'Such user already exists',
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

  @ApiOperation({ description: 'Get API access token for existing user' })
  @ApiBadRequestResponse({
    schema: {
      type: 'string',
      examples: [
        'This user has not been found',
        'Password is invalid!',
      ],
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
