import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards, BadRequestException } from '@nestjs/common';

import CurrencyShouldBeDeletedEvent from './events/currencyShouldBeDeleted.event';

import { Roles } from '@app/users/enums/roles.enum';
import IEventDispatchService from '@app/events/eventDispatchService.interface';

import CurrencyAbstractFactory from '@domain/currencies/factories/currencyFactory';
import IRepository from '@domain/repository.interface';
import ICurrency from '@domain/currencies/entities/currency.interface';

import { OnlyRoles } from '@common/decorators/roles.decorator';
import {
  CreateCurrencyInput,
  UpdateCurrencyInput,
} from '@common/graphql.schema.generated';
import GqlAuthGuard from '@common/guards/gql-auth.guard';

@Resolver('Currency')
@OnlyRoles(Roles.ADMINISTRATOR)
export default class CurrenciesResolver {
  private readonly currencyRepo: IRepository<ICurrency>;

  constructor(
    @Inject('CurrencyShouldBeDeletedEventDispatcher')
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

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteCurrency(@Args('id') id: string): Promise<ICurrency> {
    const currency: ICurrency = await this.currencyRepo.findById(id);
    if (!currency) {
      throw new BadRequestException('Currency doesn`t exist!');
    }
    await this.currencyShoulBeDeletedEventDispatcher.emit(
      new CurrencyShouldBeDeletedEvent(currency),
    );
    return currency;
  }
}
