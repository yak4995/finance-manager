import { Module } from '@nestjs/common';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { GraphQLModule } from '@nestjs/graphql';
import * as redis from 'redis';

import PrismaModule from '@persistance/prisma/prisma.module';
import TransactionCategoryCreator from '@persistance/creators/transactionCategory.creator';
import { PrismaService } from '@persistance/prisma/prisma.service';
import TransactionCategoryRepository from '@persistance/repositories/transactionCategory.repository';
import TransactionCategoryFactory from '@persistance/factories/transactionCategory.factory';

import TransactionCategoriesResolver from './resolvers/transactionCategories.resolver';
import TransactionCategoriesController from './controllers/transactionCategories.controller';
import DefTransactionCategoryOutputPort from './ports/defTransactionCategoryOutput.port';
import { TransactionCategorySearchService } from './services/transactionCategorySearch.service';
import TransactionCategoryShouldBeDeletedListener from './listeners/transactionCategoryShouldBeDeleted.listener';
import TransactionCategoryShoulBeDeletedEventDispatcher from './services/transactionCategoryShoulBeDeletedDispatcher';
import { TransactionCategoriesFacade } from './transactionCategories.facade';

import TransactionCategoryInteractor from '@app/transactionCategories/interactors/transactionCategory.interactor';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';
import TransactionCategoryService from '@domain/transactionCategories/services/transactionCategoryService';

import { LoggerModule } from '@transport/logger/logger.module';

import { AuthModule } from '@common/auth.module';
import { CacheService } from '@common/services/cache.service';
import { RedisCacheService } from '@common/services/redisCache.service';

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
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
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
    LoggerModule,
    ConfigModule.forRoot(),
  ],
  controllers: [TransactionCategoriesController, TransactionCategoriesFacade],
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
        new TransactionCategoryInteractor(factory, searchService, outputPort),
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