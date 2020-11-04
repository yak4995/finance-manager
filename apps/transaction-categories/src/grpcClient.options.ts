import { ClientOptions, Transport } from '@nestjs/microservices';
const protoPath = 'libs/transport/src/proto/categories.proto';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `localhost:${process.env.CATEGORIES_GRPC_PORT ?? 3005}`,
    package: 'categoriesService',
    protoPath,
  },
};
