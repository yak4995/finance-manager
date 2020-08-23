import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import {
  CreateCurrencyInput,
  UpdateCurrencyInput,
} from '../../graphql.schema.generated';
import CurrencyAbstractFactory from '../../../core/domain/transactions/factories/currencyFactory';
import GqlAuthGuard from '../auth/guards/gql-auth.guard';
import { OnlyRoles } from '../../decorators/roles.decorator';
import { Roles } from '../../../core/app/users/enums/roles.enum';
import CurrencyShouldBeDeletedEvent from './events/currencyShouldBeDeleted.event';
import IEventDispatchService from '../../../core/app/events/eventDispatchService.interface';

@Resolver('Currency')
@OnlyRoles(Roles.ADMINISTRATOR)
export default class CurrenciesResolver {
  private readonly currencyRepo: IRepository<ICurrency>;

  constructor(
    @Inject('CurrencyShoulBeDeletedEventDispatcher')
    private readonly currencyShoulBeDeletedEventDispatcher: IEventDispatchService<
      CurrencyShouldBeDeletedEvent
    >,
    private readonly currencyFactory: CurrencyAbstractFactory,
  ) {
    this.currencyRepo = currencyFactory.createCurrencyRepo();
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  currencies(): Promise<ICurrency[]> {
    return this.currencyRepo.findByAndCriteria({});
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async currency(@Args('id') id: string): Promise<ICurrency> {
    return this.currencyRepo.findById(id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  createCurrency(@Args('data') data: CreateCurrencyInput): Promise<ICurrency> {
    const { id, ...preparedData } = this.currencyFactory.createCurrency(data);
    return this.currencyRepo.insert(preparedData as ICurrency);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  updateCurrency(@Args('data') data: UpdateCurrencyInput): Promise<ICurrency> {
    const { id, ...preparedData } = data;
    return this.currencyRepo.update(preparedData, id);
  }

  // TODO: check for correction
  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteCurrency(@Args('id') id: string): Promise<ICurrency> {
    const currency: ICurrency = await this.currencyRepo.findById(id);
    await this.currencyShoulBeDeletedEventDispatcher.emit(
      new CurrencyShouldBeDeletedEvent(currency),
    );
    return currency;
  }
}
