import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import AuthModule from './infrastructure/ui/auth/auth.module';
import UsersModule from './infrastructure/ui/users/users.module';
import PrismaModule from './infrastructure/persistance/prisma/prisma.module';
import GraphqlOptions from './graphql.options';
import CurrenciesModule from './infrastructure/ui/currencies/currencies.module';
import TransactionCategoriesModule from './infrastructure/ui/transactionCategories/transactionCategories.module';

// TODO: нужен ли фасад (который должен быть синглтоном) и посредник (особенно при разбитии на микросервисы)?
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export default class AppModule {}
