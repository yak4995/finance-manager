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
import { DistributingMetricItemsController } from './controllers/distributingMetricItems.controller';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import ReportDistributionInteractor from '../../../core/app/transactions/interactors/reportDistribution.interactor';
import DistributingMetricItemAbstractFactory from '../../../core/app/transactions/factories/distributingMetricItemFactory';
import { DefReportDistributionOutputPort } from './ports/defReportDistributionOutput.port';
import ReportHasBeenGeneratedEventDispatcher from './services/reportHasBeenGenerated.dispatcher';
import ReportHasBeenGeneratedListener from './listeners/reportHasBeenGenerated.listener';
import DistributingMetricItemFactory from '../../persistance/factories/distributingMetricItem.factory';
import DistributingMetricItemRepository from '../../persistance/repositories/distributingMetricItem.repository';
import DistributingMetricItemCreator from '../../persistance/creators/distributingMetricItem.creator';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    // TODO: use Kafka instead of Redis
    BullModule.registerQueueAsync({
      name: 'metrics',
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
    ScheduleModule.forRoot(),
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
  controllers: [TransactionController, DistributingMetricItemsController],
  providers: [
    TransactionSearchService,
    ReportHasBeenGeneratedEventDispatcher,
    DefTransactionOutputPort,
    DefReportDistributionOutputPort,
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
    {
      provide: 'DistributingMetricItemCreator',
      useClass: DistributingMetricItemCreator,
    },
    {
      provide: 'DistributingMetricItemRepositoryForFactory',
      useFactory: (prisma: PrismaService) =>
        new DistributingMetricItemRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: DistributingMetricItemAbstractFactory,
      useClass: DistributingMetricItemFactory,
    },
    {
      provide: 'TransactionCategoryShouldBeDeletedEventListeners',
      useFactory: (mailService: MailerService) => [
        new ReportHasBeenGeneratedListener(mailService),
      ],
      inject: [MailerService],
    },
    {
      provide: 'ReportDistributionInputPort',
      useFactory: (
        distributionMetricItemFactory: DistributingMetricItemAbstractFactory,
        transactionFactory: TransactionAbstractFactory,
        transactionAnalyticService: TransactionAnalyticService,
        eventDispatcher: ReportHasBeenGeneratedEventDispatcher,
        outputPort: DefReportDistributionOutputPort,
      ) =>
        new ReportDistributionInteractor(
          distributionMetricItemFactory,
          transactionFactory.createTransactionRepo(),
          transactionAnalyticService,
          eventDispatcher,
          outputPort,
        ),
      inject: [
        DistributingMetricItemAbstractFactory,
        TransactionAbstractFactory,
        TransactionAnalyticService,
        ReportHasBeenGeneratedEventDispatcher,
        DefReportDistributionOutputPort,
      ],
    },
  ],
})
export default class TransactionsModule {}
