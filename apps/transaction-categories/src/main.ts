import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import TransactionCategoriesModule from './transactionCategories.module';
import { grpcClientOptions } from './grpcClient.options';

import HttpExceptionFilter from '@common/filters/http-exception.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

async function bootstrap() {
  const keyFile: Buffer = fs.readFileSync(
    process.env.SSL_KEY_FILE_PATH ?? 'ssl/client-1.local.key',
  );
  const certFile: Buffer = fs.readFileSync(
    process.env.SSL_CERT_FILE_PATH ?? 'ssl/client-1.local.crt',
  );
  const app: INestApplication = await NestFactory.create(
    TransactionCategoriesModule,
    {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      },
    },
  );
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalInterceptors(new LoggingInterceptor('transaction-categories'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();

  const options = new DocumentBuilder()
    .setTitle('Transaction categories manager')
    .setDescription('The finance manager API description')
    .setVersion('0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get<number>('CATEGORIES_PORT'));
}
bootstrap();
