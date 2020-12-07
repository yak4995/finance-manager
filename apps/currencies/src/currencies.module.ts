import { Module, HttpModule } from '@nestjs/common';
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
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  controllers: [CurrenciesFacade],
  providers: [
    CurrenciesResolver,
    CurrencyConverterService,
    CurrencyShouldBeDeletedEventDispatcher,
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
  ],
})
export default class CurrenciesModule {}
