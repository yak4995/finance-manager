import { ClientOptions, Transport } from '@nestjs/microservices';
const protoPath = 'libs/transport/src/proto/currencies.proto';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.CURRENCIES_GRPC_URL ?? 'localhost:3002'}`,
    package: 'currenciesService',
    protoPath,
  },
};
