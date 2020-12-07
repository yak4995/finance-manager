import { ClientOptions, Transport } from '@nestjs/microservices';
const protoPath = 'libs/transport/src/proto/categories.proto';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.CATEGORIES_GRPC_URL ?? 'localhost:3005'}`,
    package: 'categoriesService',
    protoPath,
  },
};
