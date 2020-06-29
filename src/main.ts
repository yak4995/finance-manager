import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppModule from './app.module';
import HttpExceptionFilter from './infrastructure/http-exception.filter';

async function bootstrap() {
  const keyFile: Buffer = fs.readFileSync(
    process.env.SSL_KEY_FILE_PATH ?? 'ssl/client-1.local.key',
  );
  const certFile: Buffer = fs.readFileSync(
    process.env.SSL_CERT_FILE_PATH ?? 'ssl/client-1.local.crt',
  );
  const app: INestApplication = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  const options = new DocumentBuilder()
    .setTitle('Finance manager')
    .setDescription('The finance manager API description')
    .setVersion('0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
