import { Module } from '@nestjs/common';
import TransactionCategoriesResolver from './resolvers/transactionCategories.resolver';
import TransactionCategoryAbstractFactory from '../../../core/domain/transactions/factories/transactionCategoryFactory';
import TransactionCategoryFactory from '../../persistance/factories/transactionCategory.factory';
import TransactionCategoryCreator from '../../persistance/creators/transactionCategory.creator';
import PrismaModule from '../../persistance/prisma/prisma.module';
import TransactionCategoryRepository from '../../persistance/repositories/transactionCategory.repository';
import PrismaService from '../../persistance/prisma/prisma.service';
import AuthModule from '../auth/auth.module';
import TransactionCategoriesController from './controllers/transactionCategories.controller';
import TransactionCategoryInteractor from '../../../core/app/transactions/interactors/transactionCategory.interactor';
import DefTransactionCategoryOutputPort from './ports/defTransactionCategoryOutput.port';
import { TransactionCategorySearchService } from './services/transactionCategorySearch.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [TransactionCategoriesController],
  providers: [
    TransactionCategoriesResolver,
    TransactionCategorySearchService,
    DefTransactionCategoryOutputPort,
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
      provide: 'TransactionCategoryInputPort',
      useFactory: (
        factory: TransactionCategoryAbstractFactory,
        searchService: TransactionCategorySearchService,
        outputPort: DefTransactionCategoryOutputPort,
      ) =>
        new TransactionCategoryInteractor(
          factory,
          factory.createTransactionCategoryRepo(),
          searchService,
          outputPort,
        ),
      inject: [
        TransactionCategoryAbstractFactory,
        TransactionCategorySearchService,
        DefTransactionCategoryOutputPort,
      ],
    },
  ],
})
export default class TransactionCategoriesModule {}
