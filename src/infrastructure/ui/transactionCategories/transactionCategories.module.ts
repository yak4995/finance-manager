import { Module } from '@nestjs/common';
import TransactionCategoriesResolver from './resolvers/transactionCategories.resolver';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import TransactionCategoryFactory from '../../persistance/factories/transactionCategory.factory';
import TransactionCategoryCreator from '../../persistance/creators/transactionCategory.creator';
import PrismaModule from '../../persistance/prisma/prisma.module';
import TransactionCategoryRepository from '../../persistance/repositories/transactionCategory.repository';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import AuthModule from '../auth/auth.module';
import TransactionCategoriesController from './controllers/transactionCategories.controller';
import TransactionCategoryInteractor from '../../../core/app/transactions/interactors/transactionCategory.interactor';
import DefTransactionCategoryOutputPort from './ports/defTransactionCategoryOutput.port';
import { TransactionCategorySearchService } from './services/transactionCategorySearch.service';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import TransactionCategoryShouldBeDeletedListener from './listeners/transactionCategoryShouldBeDeleted.listener';
import * as redis from 'redis';
import { CacheService } from '../../cache.service';
import ITransactionCategory from '../../../core/domain/transactions/entities/transactionCategory.interface';
import { RedisCacheService } from '../../redisCache.service';
import TransactionCategoryShoulBeDeletedEventDispatcher from './services/transactionCategoryShoulBeDeletedDispatcher';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    // TODO: use Kafka instead of Redis
    BullModule.registerQueueAsync({
      name: 'categoryDeletion',
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
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TransactionCategoriesController],
  providers: [
    TransactionCategoriesResolver,
    TransactionCategorySearchService,
    DefTransactionCategoryOutputPort,
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
      provide: TransactionCategoryAbstractFactory,
      useClass: TransactionCategoryFactory,
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
      provide: 'TransactionCategoryInputPort',
      useFactory: (
        factory: TransactionCategoryAbstractFactory,
        searchService: TransactionCategorySearchService,
        outputPort: DefTransactionCategoryOutputPort,
      ) =>
        new TransactionCategoryInteractor(
          factory,
          factory.createTransactionCategoryRepo(),
          searchService,
          outputPort,
        ),
      inject: [
        TransactionCategoryAbstractFactory,
        TransactionCategorySearchService,
        DefTransactionCategoryOutputPort,
      ],
    },
    {
      provide: 'TransactionCategoryShoulBeDeletedEventDispatcher',
      useClass: TransactionCategoryShoulBeDeletedEventDispatcher,
    },
    {
      provide: 'TransactionCategoryShouldBeDeletedEventListeners',
      useFactory: (
        transactionCategoryFactory: TransactionCategoryAbstractFactory,
      ) => [
        new TransactionCategoryShouldBeDeletedListener(
          transactionCategoryFactory,
        ),
      ],
      inject: [TransactionCategoryAbstractFactory],
    },
  ],
})
export default class TransactionCategoriesModule {}
