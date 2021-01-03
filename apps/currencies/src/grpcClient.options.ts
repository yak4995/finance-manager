import { ClientOptions, Transport } from '@nestjs/microservices';
const protoPath = 'libs/transport/src/proto/currencies.proto';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.CURRENCIES_URL ?? 'localhost'}:${process.env
      .CURRENCIES_GRPC_PORT ?? 3002}`,
    package: 'currenciesService',
    protoPath,
  },
};
