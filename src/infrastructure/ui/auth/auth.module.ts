import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import {
  MailerService,
  MailerModule,
  PugAdapter,
} from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import UsersModule from '../users/users.module';
import AuthService from './services/auth.service';
import JwtStrategy from './services/jwt.strategy';
import AuthController from './controllers/auth.controller';
import UserCredentialAbstractFactory from '../../../core/app/users/factories/userCredentialFactory';
import PrismaService from '../../persistance/prisma/prisma.service';
import UserCredentialRepository from '../../persistance/repositories/userCredential.repository';
import UserCredentialCreator from '../../persistance/creators/userCredential.creator';
import UserCredentialFactory from '../../persistance/factories/userCredential.factory';
import UserHasBeenRegisteredEventDispatcher from './services/userHasBeenRegisteredEventDispatcher';
import UserShouldBeDeletedEventDispatcher from './services/userShouldBeDeletedEventDispatcher';
import DefAuthorityOutputPort from './ports/defAuthorityOutput.port';
import PrismaModule from '../../persistance/prisma/prisma.module';
import GqlAuthGuard from './guards/gql-auth.guard';
import UserHasBeenCreatedEventListener from './listeners/userHasBeenCreatedEvent.listener';
import UserShouldBeDeletedEventListener from './listeners/userShouldBeDeletedEvent.listener';
import AuthorityInteractor from '../../../core/app/users/interactors/authority.interactor';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    // TODO: use Kafka instead of Redis
    BullModule.registerQueueAsync(
      {
        name: 'mailing',
        useFactory: async (
          configService: ConfigService,
        ): Promise<BullModuleOptions> => ({
          redis: {
            host: configService.get('QUEUE_HOST'),
            port: configService.get('QUEUE_PORT'),
            password: configService.get('QUEUE_PASSWORD'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'sheduledUsersForDelete',
        useFactory: async (
          configService: ConfigService,
        ): Promise<BullModuleOptions> => ({
          redis: {
            host: configService.get('QUEUE_HOST'),
            port: configService.get('QUEUE_PORT'),
            password: configService.get('QUEUE_PASSWORD'),
          },
        }),
        inject: [ConfigService],
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
            '../../../..',
            configService.get<string>('MAIL_TEMPLATES_PATH'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({}),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TOKEN_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserHasBeenRegisteredEventDispatcher,
    UserShouldBeDeletedEventDispatcher,
    UserHasBeenCreatedEventListener,
    UserShouldBeDeletedEventListener,
    DefAuthorityOutputPort,
    GqlAuthGuard,
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
    {
      provide: 'UserShouldBeDeletedEventListeners',
      useFactory: (authService: AuthService) => [
        new UserShouldBeDeletedEventListener(authService),
      ],
      inject: [AuthService],
    },
    {
      provide: 'SessionsManagementInputPort&UserCredentialsManagementInputPort',
      useFactory: (
        authService: AuthService,
        userCredentialFactory: UserCredentialAbstractFactory,
        userHasBeenRegisteredEventDispatcher: UserHasBeenRegisteredEventDispatcher,
        userShouldBeDeletedEventDispatcher: UserShouldBeDeletedEventDispatcher,
        authOutputPort: DefAuthorityOutputPort,
      ) =>
        new AuthorityInteractor(
          authService,
          userCredentialFactory.createUserCredentialRepo(),
          userHasBeenRegisteredEventDispatcher,
          userShouldBeDeletedEventDispatcher,
          authOutputPort,
        ),
      inject: [
        AuthService,
        UserCredentialAbstractFactory,
        UserHasBeenRegisteredEventDispatcher,
        UserShouldBeDeletedEventDispatcher,
        DefAuthorityOutputPort,
      ],
    },
  ],
  exports: [AuthService, GqlAuthGuard],
})
export default class AuthModule {}
