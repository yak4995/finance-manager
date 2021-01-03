import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

const protoPath = 'libs/transport/src/proto/categories.proto';

export const grpcCategoriesClientOptions: ClientProviderOptions = {
  transport: Transport.GRPC,
  name: 'CATEGORIES_SERVICE',
  options: {
    url: `${process.env.CATEGORIES_URL ?? 'localhost'}:${process.env
      .CATEGORIES_GRPC_PORT ?? 3005}`,
    package: 'categoriesService',
    protoPath,
  },
};
