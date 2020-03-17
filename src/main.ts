import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './infrastructure/ui/config/config.service';

async function bootstrap() {
  const configService: ConfigService = new ConfigService('.env');
  const keyFile  = fs.readFileSync(configService.get('SSL_KEY_FILE_PATH'));
  const certFile = fs.readFileSync(configService.get('SSL_CERT_FILE_PATH'));
  const app = await NestFactory.create(
    AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }},
  );
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
