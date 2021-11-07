import {
  Module,
  HttpModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

import CurrencyCreator from '@persistance/creators/currency.creator';
import { PrismaService } from '@persistance/prisma/prisma.service';
import CurrencyRepository from '@persistance/repositories/currency.repository';
import CurrencyFactory from '@persistance/factories/currency.factory';
import PrismaModule from '@persistance/prisma/prisma.module';

import CurrenciesResolver from './currencies.resolver';
import CurrencyConverterService from './services/currencyConverter.service';
import CurrencyShouldBeDeletedEventDispatcher from './services/currencyShouldBeDeletedEventDispacher';
import CurrencyShouldBeDeletedEventListener from './listeners/currencyShouldBeDeletedEvent.listener';
import { CurrenciesFacade } from './currencies.facade';

import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';

import { LoggerModule } from '@transport/logger/logger.module';

import { AuthModule } from '@common/auth.module';
import RequestIdentificationMiddleware from '@common/middlewares/requestIdentification.middleware';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    HttpModule,
    LoggerModule,
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
      imports: [
        ConfigModule.forRoot({
          envFilePath: process.env.IS_LOCAL ? '.env.local' : '.env',
        }),
      ],
    }),
    GraphQLModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: process.env.IS_LOCAL ? '.env.local' : '.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // typePaths: ['./src/infrastructure/ui/schema.graphql'],
        typePaths: ['./**/*.graphql'],
        path: '/graphql',
        installSubscriptionHandlers: true,
        resolverValidationOptions: {
          requireResolversForResolveType: 'ignore',
        },
        debug: configService.get('DEBUG_MODE') === '1',
        introspection: true,
        context: ({ req }) => ({ req }),
      }),
    }),
    BullModule.registerQueueAsync({
      name: 'currencyDeletion',
      useFactory: async (
        configService: ConfigService,
      ): Promise<BullModuleOptions> => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      imports: [
        ConfigModule.forRoot({
          envFilePath: process.env.IS_LOCAL ? '.env.local' : '.env',
        }),
      ],
      inject: [ConfigService],
    }),
  ],
  controllers: [CurrenciesFacade],
  providers: [
    CurrenciesResolver,
    CurrencyConverterService,
    {
      provide: 'CurrencyShouldBeDeletedEventDispatcher',
      useClass: CurrencyShouldBeDeletedEventDispatcher,
    },
    CurrencyShouldBeDeletedEventListener,
    {
      provide: 'CurrencyCreator',
      useClass: CurrencyCreator,
    },
    {
      provide: 'CurrencyRepositoryForFactory',
      useFactory: (prisma: PrismaService) => new CurrencyRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CurrencyAbstractFactory,
      useClass: CurrencyFactory,
    },
    {
      provide: 'CurrencyShouldBeDeletedEventListeners',
      useFactory: (currencyFactory: CurrencyAbstractFactory) => [
        new CurrencyShouldBeDeletedEventListener(currencyFactory),
      ],
      inject: [CurrencyAbstractFactory],
    },
    {
      provide: 'appName',
      useValue: 'currencies',
    },
  ],
})
export default class CurrenciesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdentificationMiddleware)
      .exclude({
        path: 'api/docs*',
        method: RequestMethod.ALL,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
