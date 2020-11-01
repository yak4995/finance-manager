import { Module, HttpModule } from '@nestjs/common';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

import CurrencyCreator from '../../persistance/creators/currency.creator';
import CurrencyFactory from '../../persistance/factories/currency.factory';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import CurrencyRepository from '../../persistance/repositories/currency.repository';
import PrismaModule from '../../persistance/prisma/prisma.module';

import CurrenciesResolver from './currencies.resolver';
import AuthModule from '../auth/auth.module';
import CurrencyConverterService from './services/currencyConverter.service';
import CurrencyShouldBeDeletedEventDispatcher from './services/currencyShouldBeDeletedEventDispacher';
import CurrencyShouldBeDeletedEventListener from './listeners/currencyShouldBeDeletedEvent.listener';
import { CurrenciesFacade } from './currencies.facade';

import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    HttpModule,
    // TODO: use Kafka instead of Redis
    BullModule.registerQueueAsync({
      name: 'currencyDeletion',
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
  ],
  providers: [
    CurrencyConverterService,
    CurrenciesResolver,
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
      provide: 'CurrencyShouldBeDeletedEventDispatcher',
      useClass: CurrencyShouldBeDeletedEventDispatcher,
    },
    {
      provide: 'CurrencyShouldBeDeletedEventListeners',
      useFactory: (currencyFactory: CurrencyAbstractFactory) => [
        new CurrencyShouldBeDeletedEventListener(currencyFactory),
      ],
      inject: [CurrencyAbstractFactory],
    },
    CurrenciesFacade,
  ],
  exports: [CurrencyConverterService, CurrenciesFacade],
})
export default class CurrenciesModule {}
