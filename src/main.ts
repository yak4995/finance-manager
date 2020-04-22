import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import AppModule from './app.module';
import { ConfigService } from '@nestjs/config';

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
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
