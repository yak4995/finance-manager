import { Module } from '@nestjs/common';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import TransactionCategoryFactory from '../../persistance/factories/transactionCategory.factory';
import TransactionCategoryRepository from '../../persistance/repositories/transactionCategory.repository';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import AuthModule from '../auth/auth.module';
import TransactionController from './controllers/transaction.controller';
import { TransactionSearchService } from './services/transactionSearch.service';
import { DefTransactionOutputPort } from './ports/defTransactionOutput.port';
import TransactionCreator from '../../persistance/creators/transaction.creator';
import PrismaModule from '../../persistance/prisma/prisma.module';
import TransactionAbstractFactory from '../../../core/domain/transactions/factories/transactionFactory';
import TransactionFactory from '../../persistance/factories/transaction.factory';
import TransactionInteractor from '../../../core/app/transactions/interactors/transaction.interactor';
import CurrencyAbstractFactory from '../../../core/domain/transactions/factories/currencyFactory';
import TransactionAnalyticService from '../../../core/domain/transactions/services/transactionAnalyticService';
import CurrencyConverterService from '../currencies/services/currencyConverter.service';
import TransactionCategoryService from '../../../core/domain/transactions/services/transactionCategoryService';
import CurrencyFactory from '../../persistance/factories/currency.factory';
import TransactionCategoryCreator from '../../persistance/creators/transactionCategory.creator';
import TransactionRepository from '../../persistance/repositories/transaction.repository';
import CurrencyRepository from '../../persistance/repositories/currency.repository';
import CurrencyCreator from '../../persistance/creators/currency.creator';
import CurrenciesModule from '../currencies/currencies.module';
import * as redis from 'redis';
import { CacheService } from '../../cache.service';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../../redisCache.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CurrenciesModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionSearchService,
    DefTransactionOutputPort,
    {
      provide: 'TransactionCreator',
      useClass: TransactionCreator,
    },
    {
      provide: 'TransactionRepositoryForFactory',
      useFactory: (prisma: PrismaService) => new TransactionRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: 'TransactionCategoryCreator',
      useClass: TransactionCategoryCreator,
    },
    {
      provide: 'TransactionCategoryRepositoryForFactory',
      useFactory: (
        prisma: PrismaService,
        cacheService: CacheService<ITransactionCategory>,
      ) => {
        return new TransactionCategoryRepository(prisma, cacheService);
      },
      inject: [PrismaService, 'CategoryCacheService'],
    },
    {
      provide: 'CategoryCacheService',
      useFactory: (configService: ConfigService) =>
        new RedisCacheService(
          redis.createClient({
            host: configService.get('QUEUE_HOST'),
            port: configService.get('QUEUE_PORT'),
            password: configService.get('QUEUE_PASSWORD'),
          }),
        ),
      inject: [ConfigService],
    },
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
      provide: TransactionAbstractFactory,
      useClass: TransactionFactory,
    },
    {
      provide: TransactionCategoryAbstractFactory,
      useClass: TransactionCategoryFactory,
    },
    {
      provide: CurrencyAbstractFactory,
      useClass: CurrencyFactory,
    },
    {
      provide: TransactionCategoryService,
      useFactory: (
        transactionCategoryFactory: TransactionCategoryAbstractFactory,
      ) =>
        new TransactionCategoryService(
          transactionCategoryFactory.createTransactionCategoryRepo(),
        ),
      inject: [TransactionCategoryAbstractFactory],
    },
    {
      provide: TransactionAnalyticService,
      useFactory: (
        converter: CurrencyConverterService,
        transactionCategoryService: TransactionCategoryService,
      ) =>
        new TransactionAnalyticService(
          [],
          converter,
          transactionCategoryService,
        ),
      inject: [CurrencyConverterService, TransactionCategoryService],
    },
    {
      provide: 'TransactionManagementInputPort & TransactionAnalyticInputPort',
      useFactory: (
        transactionFactory: TransactionAbstractFactory,
        transactionCategoryFactory: TransactionCategoryAbstractFactory,
        currencyFactory: CurrencyAbstractFactory,
        transactionCategoryService: TransactionCategoryService,
        transactionAnalyticService: TransactionAnalyticService,
        searchService: TransactionSearchService,
        outputPort: DefTransactionOutputPort,
      ) =>
        new TransactionInteractor(
          transactionFactory,
          transactionCategoryService,
          transactionCategoryFactory.createTransactionCategoryRepo(),
          transactionFactory.createTransactionRepo(),
          currencyFactory.createCurrencyRepo(),
          transactionAnalyticService,
          searchService,
          outputPort,
        ),
      inject: [
        TransactionAbstractFactory,
        TransactionCategoryAbstractFactory,
        CurrencyAbstractFactory,
        TransactionCategoryService,
        TransactionAnalyticService,
        TransactionSearchService,
        DefTransactionOutputPort,
      ],
    },
  ],
})
export default class TransactionsModule {}
