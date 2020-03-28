import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { MailerService, MailerModule } from '@nestjs-modules/mailer';
import UsersModule from '../users/users.module';
import AuthService from './services/auth.service';
import JwtStrategy from './services/jwt.strategy';
import ConfigService from '../config/config.service';
import ConfigModule from '../config/config.module';
import AuthController from './controllers/auth.controller';
import UserCredentialAbstractFactory from '../../../core/app/users/factories/userCredentialFactory';
import PrismaService from '../../persistance/prisma/prisma.service';
import UserCredentialRepository from '../../persistance/repositories/userCredential.repository';
import UserCredentialCreator from '../../persistance/creators/userCredential.creator';
import UserCredentialFactory from '../../persistance/factories/userCredential.factory';
import AuthEventDispatcher from './services/authEventDispatcher';
import DefAuthorityOutputPort from './ports/defAuthorityOutput.port';
import PrismaModule from '../../persistance/prisma/prisma.module';
import GqlAuthGuard from './guards/gql-auth.guard';
import UserHasBeenCreatedEventListener from './listeners/userHasBeenCreatedEvent.listener';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PrismaModule,
    // TODO: use Kafka instead of Redis
    BullModule.registerQueueAsync({
      name: 'mailing',
      imports: [ConfigModule],
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
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.getMailServiceConfiguration(),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
    UserHasBeenCreatedEventListener,
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
      provide: 'UserHasBeenCreatedEventDispatchService',
      useClass: AuthEventDispatcher,
    },
    {
      provide: 'UserHasBeenCreatedEventListeners',
      useFactory: (mailService: MailerService) => [
        new UserHasBeenCreatedEventListener(mailService),
      ],
      inject: [MailerService],
    },
    {
      provide: 'AuthorityOutputPort',
      useClass: DefAuthorityOutputPort,
    },
  ],
  exports: [AuthService, GqlAuthGuard],
})
export default class AuthModule {}
