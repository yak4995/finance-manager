import { Module, forwardRef } from '@nestjs/common';
import CurrencyAbstractFactory from '../../../core/domain/transactions/factories/currencyFactory';
import CurrenciesResolver from './currencies.resolver';
import CurrencyCreator from '../../persistance/creators/currency.creator';
import CurrencyFactory from '../../persistance/factories/currency.factory';
import PrismaService from '../../persistance/prisma/prisma.service';
import CurrencyRepository from '../../persistance/repositories/currency.repository';
import PrismaModule from '../../persistance/prisma/prisma.module';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule],
  providers: [
    CurrenciesResolver,
    {
      provide: 'CurrencyCreator',
      useClass: CurrencyCreator,
    },
    {
      provide: 'CurrencyRepositoryForFactory',
      useFactory: (prisma: PrismaService) => new CurrencyRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CurrencyAbstractFactory,
      useClass: CurrencyFactory,
    },
  ],
})
export default class CurrenciesModule {}
