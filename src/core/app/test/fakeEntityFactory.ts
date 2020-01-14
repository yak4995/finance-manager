import EntityFactory from '../entityFactory';
import { Criteria } from '../../domain/repository.interface';
import ICurrency from '../../domain/transactions/entities/currency.interface';
import ITransactionCategory from '../../domain/transactions/entities/transactionCategory.interface';
import ITransaction from '../../domain/transactions/entities/transaction.interface';
import IUserCredential from '../users/entities/userCredential.interface';
import IDistributingMetricItem from '../transactions/entities/distributingMetricItem.interface';
import { Roles } from '../users/enums/roles.enum';

export default class FakeEntityFactory extends EntityFactory {
  constructor() {
    super(
      { getInstance: (fields: Criteria<ICurrency>) => null },
      {
        getInstance: (fields: Criteria<ITransactionCategory>) => ({
          id: 'fakeId',
          isOutcome: fields.isOutcome ? fields.isOutcome : true,
          isSystem: fields.isSystem ? fields.isSystem : false,
          name: fields.name ? fields.name : '',
          owner: fields.owner ? fields.owner : null,
          parentCategory: fields.parentCategory ? fields.parentCategory : null,
        }),
      },
      {
        getInstance: (fields: Criteria<ITransaction>) => ({
          id: 'fakeId',
          amount: fields.amount ? fields.amount : 0,
          currency: fields.currency ? fields.currency : null,
          datetime: fields.datetime ? fields.datetime : new Date(),
          owner: fields.owner ? fields.owner : null,
          transactionCategory: fields.transactionCategory,
          description: fields.description ? fields.description : null,
        }),
      },
      {
        getInstance: (fields: Criteria<IUserCredential>) => ({
          id: 'fakeId',
          email: fields.email ? fields.email : 'test@example.com',
          isActive: fields.isActive ? fields.isActive : true,
          profileImageUrl: fields.profileImageUrl ? fields.profileImageUrl : '',
          roles: fields.roles ? fields.roles : [Roles.USER],
        }),
      },
      { getInstance: (fields: Criteria<IDistributingMetricItem>) => null },
    );
  }

  public static getInstance(): EntityFactory {
    if (EntityFactory.instance === null) {
      EntityFactory.instance = new FakeEntityFactory();
    }
    return EntityFactory.instance;
  }
}
