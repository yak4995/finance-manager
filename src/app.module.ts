import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/ui/auth/auth.module';
import { UsersModule } from './infrastructure/ui/users/users.module';
import { UsersService } from './infrastructure/ui/users/users.service';
import { PrismaModule } from './infrastructure/persistance/prisma/prisma.module';
import { UsersResolver } from './infrastructure/ui/users/users.resolver';
import { ConfigModule } from './infrastructure/ui/config/config.module';
import { GraphqlOptions } from './graphql.options';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    UsersModule,
    PrismaModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, UsersResolver],
})
export class AppModule {}
