import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import CurrenciesModule from './currencies.module';
import { grpcClientOptions } from './grpcClient.options';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

import HttpExceptionFilter from '@common/filters/http-exception.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';

async function bootstrap() {
  const keyFile: Buffer = fs.readFileSync(
    process.env.SSL_KEY_FILE_PATH ?? 'ssl/client-1.local.key',
  );
  const certFile: Buffer = fs.readFileSync(
    process.env.SSL_CERT_FILE_PATH ?? 'ssl/client-1.local.crt',
  );
  const app: INestApplication = await NestFactory.create(CurrenciesModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalInterceptors(new LoggingInterceptor('currencies'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();

  const options = new DocumentBuilder()
    .setTitle('Currencies manager')
    .setDescription('The finance manager API description')
    .setVersion('0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get<number>('CURRENCIES_PORT'));
}
bootstrap();
