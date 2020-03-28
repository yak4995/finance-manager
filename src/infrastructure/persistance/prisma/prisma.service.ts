import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma-client';
import ConfigService from '../../ui/config/config.service';

@Injectable()
export default class PrismaService {
  public readonly client: Prisma;

  constructor(private readonly configService: ConfigService) {
    this.client = new Prisma({
      endpoint: this.configService.get('PRISMA_ENDPOINT'),
      debug: false,
    });
  }
}
