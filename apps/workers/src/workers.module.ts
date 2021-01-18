import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';
import * as redis from 'redis';

import ITransactionCategory from '@domain/transactionCategories/entities/transactionCategory.interface';
import TransactionCategoryAbstractFactory from '@domain/transactionCategories/factories/transactionCategoryFactory';

import UserCredentialAbstractFactory from '@app/users/factories/userCredentialFactory';

import PrismaModule from '@persistance/prisma/prisma.module';
import { PrismaService } from '@persistance/prisma/prisma.service';
import UserCredentialCreator from '@persistance/creators/userCredential.creator';
import UserCredentialRepository from '@persistance/repositories/userCredential.repository';
import UserCredentialFactory from '@persistance/factories/userCredential.factory';
import TransactionCategoryFactory from '@persistance/factories/transactionCategory.factory';
import TransactionCategoryRepository from '@persistance/repositories/transactionCategory.repository';
import TransactionCategoryCreator from '@persistance/creators/transactionCategory.creator';

import { AuthModule } from '@common/auth.module';
import { CacheService } from '@common/services/cache.service';
import { RedisCacheService } from '@common/services/redisCache.service';

import { DeletionController } from './controllers/deletion.controller';
import { MailingController } from './controllers/mailing.controller';
import { DeletionService } from './services/deletion.service';
import { MailingService } from './services/mailing.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.IS_LOCAL ? '.env.local' : '.env',
    }),
    AuthModule,
    PrismaModule,
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
      inject: [ConfigService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: process.env.IS_LOCAL ? '.env.local' : '.env',
        }),
      ],
    }),
  ],
  controllers: [MailingController, DeletionController],
  providers: [
    MailingService,
    DeletionService,
    {
      provide: 'UserCredentialCreator',
      useClass: UserCredentialCreator,
    },
    {
      provide: 'UserCredentialRepositoryForFactory',
      useFactory: (prisma: PrismaService) =>
        new UserCredentialRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: UserCredentialAbstractFactory,
      useClass: UserCredentialFactory,
    },
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
      provide: 'CategoryCacheService',
      useFactory: (configService: ConfigService) =>
        new RedisCacheService(
          redis.createClient({
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD'),
          }),
        ),
      inject: [ConfigService],
    },
  ],
})
export class WorkersModule {}
