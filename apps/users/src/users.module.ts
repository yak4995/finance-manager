import { Module } from '@nestjs/common';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { MailerService, MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import AuthController from './controllers/auth.controller';
import UserHasBeenRegisteredEventDispatcher from './services/userHasBeenRegisteredEventDispatcher';
import UserShouldBeDeletedEventDispatcher from './services/userShouldBeDeletedEventDispatcher';
import DefAuthorityOutputPort from './ports/defAuthorityOutput.port';
import UserHasBeenCreatedEventListener from './listeners/userHasBeenCreatedEvent.listener';
import UserShouldBeDeletedEventListener from './listeners/userShouldBeDeletedEvent.listener';
import UsersResolver from './users.resolver';

import UserCredentialAbstractFactory from '@app/users/factories/userCredentialFactory';
import AuthorityPasswordlessInteractor from '@app/users/interactors/authorityPasswordless.interactor';
// import AuthorityInteractor from '@app/users/interactors/authority.interactor';

import PrismaModule from '@persistance/prisma/prisma.module';
import UserCredentialCreator from '@persistance/creators/userCredential.creator';
import { PrismaService } from '@persistance/prisma/prisma.service';
import UserCredentialRepository from '@persistance/repositories/userCredential.repository';
import UserCredentialFactory from '@persistance/factories/userCredential.factory';

import { LoggerModule } from '@transport/logger/logger.module';

import { AuthModule } from '@common/auth.module';
// import AuthService from '@common/services/auth.service';
import PasswordlessAuthService from '@common/services/passwordlessAuth.sevice';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    LoggerModule,
    // ConfigModule,
    BullModule.registerQueueAsync(
      {
        name: 'mailing',
        useFactory: async (
          configService: ConfigService,
        ): Promise<BullModuleOptions> => ({
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
      {
        name: 'sheduledUsersForDelete',
        useFactory: async (
          configService: ConfigService,
        ): Promise<BullModuleOptions> => ({
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          ssl: false,
          tls: true,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        } as SMTPTransport.Options,
        defaults: {
          from: configService.get<string>('SMTP_FROM'),
        },
        template: {
          adapter: new PugAdapter(),
          dir: join(
            __dirname,
            '../../../..', // from dist path
            configService.get<string>('MAIL_TEMPLATES_PATH'),
          ),
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // typePaths: ['./src/infrastructure/ui/schema.graphql'],
        typePaths: ['./**/*.graphql'],
        path: '/graphql',
        installSubscriptionHandlers: true,
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
        debug: configService.get('DEBUG') === 'true',
        introspection: true,
        context: ({ req }) => ({ req }),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersResolver,
    UserHasBeenRegisteredEventDispatcher,
    UserShouldBeDeletedEventDispatcher,
    UserHasBeenCreatedEventListener,
    UserShouldBeDeletedEventListener,
    DefAuthorityOutputPort,
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
    {
      provide: 'UserHasBeenCreatedEventListeners',
      useFactory: (mailService: MailerService) => [
        new UserHasBeenCreatedEventListener(mailService),
      ],
      inject: [MailerService],
    },
    /*{
      provide: 'UserShouldBeDeletedEventListeners',
      useFactory: (authService: AuthService) => [
        new UserShouldBeDeletedEventListener(authService),
      ],
      inject: [AuthService],
    },*/
    {
      provide: 'UserShouldBeDeletedEventListeners',
      useFactory: (authService: PasswordlessAuthService) => [
        new UserShouldBeDeletedEventListener(authService),
      ],
      inject: [PasswordlessAuthService],
    },
    {
      provide: 'SessionsManagementInputPort&UserCredentialsManagementInputPort',
      useFactory: (
        // authService: AuthService,
        authService: PasswordlessAuthService,
        userCredentialFactory: UserCredentialAbstractFactory,
        userHasBeenRegisteredEventDispatcher: UserHasBeenRegisteredEventDispatcher,
        userShouldBeDeletedEventDispatcher: UserShouldBeDeletedEventDispatcher,
        authOutputPort: DefAuthorityOutputPort,
      ) =>
        // new AuthorityInteractor(
        new AuthorityPasswordlessInteractor(
          authService,
          userCredentialFactory.createUserCredentialRepo(),
          userHasBeenRegisteredEventDispatcher,
          userShouldBeDeletedEventDispatcher,
          authOutputPort,
        ),
      inject: [
        // AuthService,
        PasswordlessAuthService,
        UserCredentialAbstractFactory,
        UserHasBeenRegisteredEventDispatcher,
        UserShouldBeDeletedEventDispatcher,
        DefAuthorityOutputPort,
      ],
    },
  ],
})
export default class UsersModule {}
