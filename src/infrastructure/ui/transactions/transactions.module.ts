import { Module } from '@nestjs/common';
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
import TransactionAnalyticService from '../../../core/domain/transactions/services/transactionAnalyticService';
import CurrencyConverterService from '../currencies/services/currencyConverter.service';
import TransactionRepository from '../../persistance/repositories/transaction.repository';
import CurrenciesModule from '../currencies/currencies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import TransactionCategoriesModule from '../transactionCategories/transactionCategories.module';
import { TransactionCategoriesFacade } from '../transactionCategories/transactionCategories.facade';
import { CurrenciesFacade } from '../currencies/currencies.facade';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CurrenciesModule,
    TransactionCategoriesModule,
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
      provide: TransactionAbstractFactory,
      useClass: TransactionFactory,
    },
    {
      provide: TransactionAnalyticService,
      useFactory: (
        converter: CurrencyConverterService,
        transactionCategoriesFacade: TransactionCategoriesFacade,
      ) =>
        new TransactionAnalyticService(
          [],
          converter,
          transactionCategoriesFacade,
        ),
      inject: [CurrencyConverterService, TransactionCategoriesFacade],
    },
    {
      provide: 'TransactionManagementInputPort & TransactionAnalyticInputPort',
      useFactory: (
        transactionFactory: TransactionAbstractFactory,
        transactionCategoriesFacade: TransactionCategoriesFacade,
        currenciesFacade: CurrenciesFacade,
        transactionAnalyticService: TransactionAnalyticService,
        searchService: TransactionSearchService,
        outputPort: DefTransactionOutputPort,
      ) =>
        new TransactionInteractor(
          transactionFactory,
          transactionCategoriesFacade,
          currenciesFacade,
          transactionAnalyticService,
          searchService,
          outputPort,
        ),
      inject: [
        TransactionAbstractFactory,
        TransactionCategoriesFacade,
        CurrenciesFacade,
        TransactionAnalyticService,
        TransactionSearchService,
        DefTransactionOutputPort,
      ],
    },
  ],
})
export default class TransactionsModule {}
