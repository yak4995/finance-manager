import { Module } from '@nestjs/common';
import TransactionCategoriesResolver from './resolvers/transactionCategories.resolver';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import TransactionCategoryFactory from '../../persistance/factories/transactionCategory.factory';
import TransactionCategoryCreator from '../../persistance/creators/transactionCategory.creator';
import PrismaModule from '../../persistance/prisma/prisma.module';
import TransactionCategoryRepository from '../../persistance/repositories/transactionCategory.repository';
import PrismaService from '../../persistance/prisma/prisma.service';
import AuthModule from '../auth/auth.module';
import TransactionCategoriesController from './controllers/transactionCategories.controller';
import TransactionCategoryInteractor from '../../../core/app/transactions/interactors/transactionCategory.interactor';
import DefTransactionCategoryOutputPort from './ports/defTransactionCategoryOutput.port';
import { TransactionCategorySearchService } from './services/transactionCategorySearch.service';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import TransactionCategoryShoulBeDeletedEventDispatcher from './services/transactionCategoryShoulBeDeletedDispatcher';
import TransactionCategoryShouldBeDeletedListener from './listeners/transactionCategoryShouldBeDeleted.listener';

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
      useFactory: (prisma: PrismaService) =>
        new TransactionCategoryRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: TransactionCategoryAbstractFactory,
      useClass: TransactionCategoryFactory,
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
