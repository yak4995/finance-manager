import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import IRepository from '../../../core/domain/repository.interface';
import ICurrency from '../../../core/domain/transactions/entities/currency.interface';
import {
  CreateCurrencyInput,
  UpdateCurrencyInput,
} from '../../graphql.schema.generated';
import CurrencyAbstractFactory from '../../../core/domain/transactions/factories/currencyFactory';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { OnlyRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../../../core/app/users/enums/roles.enum';

@Resolver('Currency')
@OnlyRoles(Roles.ADMINISTRATOR)
export class CurrenciesResolver {
  constructor(
    @Inject('CurrencyRepo')
    private readonly currencyRepo: IRepository<ICurrency>,
    private readonly currencyFactory: CurrencyAbstractFactory,
  ) {}

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
  updateCurrency(@Args('data') data: UpdateCurrencyInput) {
    const { id, ...preparedData } = data;
    return this.currencyRepo.update(preparedData, id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  deleteCurrency(@Args('id') id: string) {
    return this.currencyRepo
      .delete({ id })
      .then((result: ICurrency) => result[0]);
  }
}
