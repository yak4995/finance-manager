import { Module, forwardRef } from '@nestjs/common';
import TransactionCategoriesResolver from './transactionCategories.resolver';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import TransactionCategoryFactory from '../../persistance/factories/transactionCategory.factory';
import TransactionCategoryCreator from '../../persistance/creators/transactionCategory.creator';
import PrismaModule from '../../persistance/prisma/prisma.module';
import TransactionCategoryRepository from '../../persistance/repositories/transactionCategory.repository';
import PrismaService from '../../persistance/prisma/prisma.service';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule],
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
  ],
})
export default class TransactionCategoriesModule {}
