import { Module } from '@nestjs/common';
import { TransactionCategoriesResolver } from './transactionCategories.resolver';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import { TransactionCategoryFactory } from '../../persistance/factories/transactionCategory.factory';
import { TransactionCategoryCreator } from '../../persistance/creators/transactionCategory.creator';
import { PrismaModule } from '../../persistance/prisma/prisma.module';
import { TransactionCategoryRepository } from '../../persistance/repositories/transactionCategory.repository';
import { PrismaService } from '../../persistance/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [
    TransactionCategoriesResolver,
    {
      provide: 'TransactionCategoryCreator',
      useClass: TransactionCategoryCreator,
    },
    {
      provide: 'TransactionCategoryRepositoryForFactory',
      useFactory: (prisma: PrismaService) =>
        new TransactionCategoryRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: TransactionCategoryAbstractFactory,
      useClass: TransactionCategoryFactory,
    },
    {
      provide: 'TransactionCategoryRepo',
      useFactory: (
        transactionCategoryFactory: TransactionCategoryAbstractFactory,
      ) => {
        TransactionCategoryAbstractFactory.setInstance(
          transactionCategoryFactory,
        );
        return TransactionCategoryAbstractFactory.getInstance().createTransactionCategoryRepo();
      },
      inject: [TransactionCategoryAbstractFactory],
    },
  ],
})
export class TransactionCategoriesModule {}
