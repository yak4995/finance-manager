import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './infrastructure/ui/auth/auth.module';
import { UsersModule } from './infrastructure/ui/users/users.module';
import { PrismaModule } from './infrastructure/persistance/prisma/prisma.module';
import { ConfigModule } from './infrastructure/ui/config/config.module';
import { GraphqlOptions } from './graphql.options';
import { CurrenciesModule } from './infrastructure/ui/currencies/currencies.module';
import { TransactionCategoriesModule } from './infrastructure/ui/transactionCategories/transactionCategories.module';
import { ConfigService } from './infrastructure/ui/config/config.service';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: GraphqlOptions,
    }),
    UsersModule,
    CurrenciesModule,
    TransactionCategoriesModule,
    PrismaModule,
    ConfigModule,
  ],
})
export class AppModule {}
