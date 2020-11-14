import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';

import PrismaModule from '@persistance/prisma/prisma.module';
import TransactionCreator from '@persistance/creators/transaction.creator';
import { PrismaService } from '@persistance/prisma/prisma.service';
import TransactionRepository from '@persistance/repositories/transaction.repository';
import TransactionFactory from '@persistance/factories/transaction.factory';
import DistributingMetricItemCreator from '@persistance/creators/distributingMetricItem.creator';
import DistributingMetricItemRepository from '@persistance/repositories/distributingMetricItem.repository';
import DistributingMetricItemFactory from '@persistance/factories/distributingMetricItem.factory';

import { LoggerModule } from '@transport/logger/logger.module';

import TransactionController from './controllers/transaction.controller';
import { TransactionSearchService } from './services/transactionSearch.service';
import { DefTransactionOutputPort } from './ports/defTransactionOutput.port';
import { DistributingMetricItemsController } from './controllers/distributingMetricItems.controller';
import { DefReportDistributionOutputPort } from './ports/defReportDistributionOutput.port';
import ReportHasBeenGeneratedEventDispatcher from './services/reportHasBeenGenerated.dispatcher';
import ReportHasBeenGeneratedListener from './listeners/reportHasBeenGenerated.listener';
import { TransactionCategoriesFacade } from './facades/transactionCategories.facade';
import { CurrenciesFacade } from './facades/currencies.facade';

import TransactionAbstractFactory from '@domain/transactions/factories/transactionFactory';
import TransactionAnalyticService from '@domain/transactions/services/transactionAnalyticService';

import DistributingMetricItemAbstractFactory from '@app/transactions/factories/distributingMetricItemFactory';
import ReportDistributionInteractor from '@app/transactions/interactors/reportDistribution.interactor';
import TransactionInteractor from '@app/transactions/interactors/transaction.interactor';

import { AuthModule } from '@common/auth.module';
import { grpcCurrenciesClientOptions } from '@common/grpcCurrenciesClientOptions';
import { grpcCategoriesClientOptions } from '@common/grpcCategoriesClientOptions';

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    ConfigModule.forRoot(),
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
      imports: [ConfigModule],
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
            '../../../..', // from dist path
            configService.get<string>('MAIL_TEMPLATES_PATH'),
          ),
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
    ClientsModule.register([
      grpcCurrenciesClientOptions,
      grpcCategoriesClientOptions,
    ]),
  ],
  controllers: [TransactionController, DistributingMetricItemsController],
  providers: [
    CurrenciesFacade,
    TransactionCategoriesFacade,
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
        currenciesFacade: CurrenciesFacade,
        transactionCategoriesFacade: TransactionCategoriesFacade,
      ) =>
        new TransactionAnalyticService(
          [],
          currenciesFacade,
          transactionCategoriesFacade,
        ),
      inject: [CurrenciesFacade, TransactionCategoriesFacade],
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
      provide: 'ReportHasBeenGeneratedEventListeners',
      useFactory: (
        mailService: MailerService,
        categoriesFacade: TransactionCategoriesFacade,
      ) => [new ReportHasBeenGeneratedListener(mailService, categoriesFacade)],
      inject: [MailerService, TransactionCategoriesFacade],
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
