import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import UserCredentialAbstractFactory from '@app/users/factories/userCredentialFactory';

import UserCredentialCreator from '@persistance/creators/userCredential.creator';
import UserCredentialFactory from '@persistance/factories/userCredential.factory';

import PrismaModule from '@persistance/prisma/prisma.module';
import { PrismaService } from '@persistance/prisma/prisma.service';
import UserCredentialRepository from '@persistance/repositories/userCredential.repository';

import { LoggerModule } from '@transport/logger/logger.module';

import GqlAuthGuard from './guards/gql-auth.guard';
import JwtAuthGuard from './guards/jwt-auth.guard';
import AuthService from './services/auth.service';
import JwtStrategy from './services/jwt.strategy';
import PasswordlessAuthService from './services/passwordlessAuth.sevice';

@Module({
  imports: [
    PrismaModule,
    LoggerModule,
    ConfigModule.forRoot(),
    PassportModule.register({}),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIRES_IN') },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [
    GqlAuthGuard,
    JwtAuthGuard,
    JwtStrategy,
    AuthService,
    PasswordlessAuthService,
    {
      provide: 'UserCredentialCreator',
      useClass: UserCredentialCreator,
    },
    {
      provide: 'UserCredentialRepositoryForFactory',
      useFactory: (prisma: PrismaService) =>
        new UserCredentialRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: UserCredentialAbstractFactory,
      useClass: UserCredentialFactory,
    },
  ],
  exports: [
    GqlAuthGuard,
    JwtAuthGuard,
    JwtStrategy,
    AuthService,
    PasswordlessAuthService,
  ],
})
export class AuthModule {}
