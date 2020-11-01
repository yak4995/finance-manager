import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import PrismaModule from './persistance/prisma/prisma.module';

import { LoggerModule } from './transport/logger/logger.module';

import AuthModule from './ui/auth/auth.module';
import CurrenciesModule from './ui/currencies/currencies.module';
import TransactionCategoriesModule from './ui/transactionCategories/transactionCategories.module';
import TransactionsModule from './ui/transactions/transactions.module';
import UsersModule from './ui/users/users.module';

// TODO: put into docker-compose:
//       - SMTP-сервер
//       - Kafka
// TODO: create shell file for installing nvm\node\npm\npx\jest\nest\docker+docker-compose
@Module({
  imports: [
    AuthModule,
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
    UsersModule,
    CurrenciesModule,
    TransactionCategoriesModule,
    TransactionsModule,
    LoggerModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export default class AppModule {}
