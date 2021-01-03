import { Transport } from '@nestjs/microservices';
import { ClientProviderOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

const protoPath = 'libs/transport/src/proto/currencies.proto';

export const grpcCurrenciesClientOptions: ClientProviderOptions = {
  transport: Transport.GRPC,
  name: 'CURRENCIES_SERVICE',
  options: {
    url: `${process.env.CURRENCIES_URL ?? 'localhost'}:${process.env
      .CURRENCIES_GRPC_PORT ?? 3002}`,
    package: 'currenciesService',
    protoPath,
  },
};
