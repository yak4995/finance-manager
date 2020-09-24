import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import AuthModule from './infrastructure/ui/auth/auth.module';
import UsersModule from './infrastructure/ui/users/users.module';
import PrismaModule from './infrastructure/persistance/prisma/prisma.module';
import CurrenciesModule from './infrastructure/ui/currencies/currencies.module';
import TransactionCategoriesModule from './infrastructure/ui/transactionCategories/transactionCategories.module';
import TransactionsModule from './infrastructure/ui/transactions/transactions.module';

// TODO: Соответствие GRASP: фасад и посредник (mediator) - реализация
// TODO: создать docker-compose, положить туда:
//       - PGSQL (и мигрировать на Prisma2 c миграциями,
//       который уже не поддерживает Prisma облако + переоформить скрипты запуска на докер),
//       - Redis/Kafka,
//       - ELK stack,
//       - SMTP-сервер
@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        typePaths: ['./src/infrastructure/ui/schema.graphql'],
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
    UsersModule,
    CurrenciesModule,
    TransactionCategoriesModule,
    TransactionsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export default class AppModule {}
