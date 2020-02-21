import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './infrastructure/ui/config/config.service';
import { ConfigModule } from 'infrastructure/ui/config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
