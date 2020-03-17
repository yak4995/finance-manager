import { Module } from '@nestjs/common';
import CurrencyAbstractFactory from '../../../core/domain/transactions/factories/currencyFactory';
import { CurrenciesResolver } from './currencies.resolver';
import { CurrencyCreator } from '../../persistance/creators/currency.creator';
import { CurrencyFactory } from '../../persistance/factories/currency.factory';
import { PrismaService } from '../../persistance/prisma/prisma.service';
import { CurrencyRepository } from '../../persistance/repositories/currency.repository';
import { PrismaModule } from '../../persistance/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
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
    {
      provide: 'CurrencyRepo',
      useFactory: (currencyFactory: CurrencyAbstractFactory) => {
        CurrencyAbstractFactory.setInstance(currencyFactory);
        return CurrencyAbstractFactory.getInstance().createCurrencyRepo();
      },
      inject: [CurrencyAbstractFactory],
    },
  ],
})
export class CurrenciesModule {}
