import { GraphQLResolveInfo, GraphQLSchema } from 'graphql';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { Options } from 'graphql-binding';
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding';

export interface Query {
  userCredentials: <T = Array<UserCredential | null>>(
    args: {
      where?: UserCredentialWhereInput | null;
      orderBy?: UserCredentialOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  currencies: <T = Array<Currency | null>>(
    args: {
      where?: CurrencyWhereInput | null;
      orderBy?: CurrencyOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  transactionCategories: <T = Array<TransactionCategory | null>>(
    args: {
      where?: TransactionCategoryWhereInput | null;
      orderBy?: TransactionCategoryOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  transactions: <T = Array<Transaction | null>>(
    args: {
      where?: TransactionWhereInput | null;
      orderBy?: TransactionOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  distributingMetricItems: <T = Array<DistributingMetricItem | null>>(
    args: {
      where?: DistributingMetricItemWhereInput | null;
      orderBy?: DistributingMetricItemOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  roles: <T = Array<Role | null>>(
    args: {
      where?: RoleWhereInput | null;
      orderBy?: RoleOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  analyticMetrics: <T = Array<AnalyticMetric | null>>(
    args: {
      where?: AnalyticMetricWhereInput | null;
      orderBy?: AnalyticMetricOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  periods: <T = Array<Period | null>>(
    args: {
      where?: PeriodWhereInput | null;
      orderBy?: PeriodOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  userCredential: <T = UserCredential | null>(
    args: { where: UserCredentialWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  currency: <T = Currency | null>(
    args: { where: CurrencyWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  transactionCategory: <T = TransactionCategory | null>(
    args: { where: TransactionCategoryWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  transaction: <T = Transaction | null>(
    args: { where: TransactionWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  distributingMetricItem: <T = DistributingMetricItem | null>(
    args: { where: DistributingMetricItemWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  role: <T = Role | null>(
    args: { where: RoleWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  analyticMetric: <T = AnalyticMetric | null>(
    args: { where: AnalyticMetricWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  period: <T = Period | null>(
    args: { where: PeriodWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  userCredentialsConnection: <T = UserCredentialConnection>(
    args: {
      where?: UserCredentialWhereInput | null;
      orderBy?: UserCredentialOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  currenciesConnection: <T = CurrencyConnection>(
    args: {
      where?: CurrencyWhereInput | null;
      orderBy?: CurrencyOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  transactionCategoriesConnection: <T = TransactionCategoryConnection>(
    args: {
      where?: TransactionCategoryWhereInput | null;
      orderBy?: TransactionCategoryOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  transactionsConnection: <T = TransactionConnection>(
    args: {
      where?: TransactionWhereInput | null;
      orderBy?: TransactionOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  distributingMetricItemsConnection: <T = DistributingMetricItemConnection>(
    args: {
      where?: DistributingMetricItemWhereInput | null;
      orderBy?: DistributingMetricItemOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  rolesConnection: <T = RoleConnection>(
    args: {
      where?: RoleWhereInput | null;
      orderBy?: RoleOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  analyticMetricsConnection: <T = AnalyticMetricConnection>(
    args: {
      where?: AnalyticMetricWhereInput | null;
      orderBy?: AnalyticMetricOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  periodsConnection: <T = PeriodConnection>(
    args: {
      where?: PeriodWhereInput | null;
      orderBy?: PeriodOrderByInput | null;
      skip?: Int | null;
      after?: String | null;
      before?: String | null;
      first?: Int | null;
      last?: Int | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  node: <T = Node | null>(
    args: { id: ID_Output },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
}

export interface Mutation {
  createUserCredential: <T = UserCredential>(
    args: { data: UserCredentialCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createCurrency: <T = Currency>(
    args: { data: CurrencyCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createTransactionCategory: <T = TransactionCategory>(
    args: { data: TransactionCategoryCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createTransaction: <T = Transaction>(
    args: { data: TransactionCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createDistributingMetricItem: <T = DistributingMetricItem>(
    args: { data: DistributingMetricItemCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createRole: <T = Role>(
    args: { data: RoleCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createAnalyticMetric: <T = AnalyticMetric>(
    args: { data: AnalyticMetricCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  createPeriod: <T = Period>(
    args: { data: PeriodCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateUserCredential: <T = UserCredential | null>(
    args: {
      data: UserCredentialUpdateInput;
      where: UserCredentialWhereUniqueInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updateCurrency: <T = Currency | null>(
    args: { data: CurrencyUpdateInput; where: CurrencyWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updateTransactionCategory: <T = TransactionCategory | null>(
    args: {
      data: TransactionCategoryUpdateInput;
      where: TransactionCategoryWhereUniqueInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updateTransaction: <T = Transaction | null>(
    args: { data: TransactionUpdateInput; where: TransactionWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updateDistributingMetricItem: <T = DistributingMetricItem | null>(
    args: {
      data: DistributingMetricItemUpdateInput;
      where: DistributingMetricItemWhereUniqueInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updateRole: <T = Role | null>(
    args: { data: RoleUpdateInput; where: RoleWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updateAnalyticMetric: <T = AnalyticMetric | null>(
    args: {
      data: AnalyticMetricUpdateInput;
      where: AnalyticMetricWhereUniqueInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  updatePeriod: <T = Period | null>(
    args: { data: PeriodUpdateInput; where: PeriodWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteUserCredential: <T = UserCredential | null>(
    args: { where: UserCredentialWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteCurrency: <T = Currency | null>(
    args: { where: CurrencyWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteTransactionCategory: <T = TransactionCategory | null>(
    args: { where: TransactionCategoryWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteTransaction: <T = Transaction | null>(
    args: { where: TransactionWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteDistributingMetricItem: <T = DistributingMetricItem | null>(
    args: { where: DistributingMetricItemWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteRole: <T = Role | null>(
    args: { where: RoleWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deleteAnalyticMetric: <T = AnalyticMetric | null>(
    args: { where: AnalyticMetricWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  deletePeriod: <T = Period | null>(
    args: { where: PeriodWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
  upsertUserCredential: <T = UserCredential>(
    args: {
      where: UserCredentialWhereUniqueInput;
      create: UserCredentialCreateInput;
      update: UserCredentialUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertCurrency: <T = Currency>(
    args: {
      where: CurrencyWhereUniqueInput;
      create: CurrencyCreateInput;
      update: CurrencyUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertTransactionCategory: <T = TransactionCategory>(
    args: {
      where: TransactionCategoryWhereUniqueInput;
      create: TransactionCategoryCreateInput;
      update: TransactionCategoryUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertTransaction: <T = Transaction>(
    args: {
      where: TransactionWhereUniqueInput;
      create: TransactionCreateInput;
      update: TransactionUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertDistributingMetricItem: <T = DistributingMetricItem>(
    args: {
      where: DistributingMetricItemWhereUniqueInput;
      create: DistributingMetricItemCreateInput;
      update: DistributingMetricItemUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertRole: <T = Role>(
    args: {
      where: RoleWhereUniqueInput;
      create: RoleCreateInput;
      update: RoleUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertAnalyticMetric: <T = AnalyticMetric>(
    args: {
      where: AnalyticMetricWhereUniqueInput;
      create: AnalyticMetricCreateInput;
      update: AnalyticMetricUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  upsertPeriod: <T = Period>(
    args: {
      where: PeriodWhereUniqueInput;
      create: PeriodCreateInput;
      update: PeriodUpdateInput;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyUserCredentials: <T = BatchPayload>(
    args: {
      data: UserCredentialUpdateManyMutationInput;
      where?: UserCredentialWhereInput | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyCurrencies: <T = BatchPayload>(
    args: {
      data: CurrencyUpdateManyMutationInput;
      where?: CurrencyWhereInput | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyTransactionCategories: <T = BatchPayload>(
    args: {
      data: TransactionCategoryUpdateManyMutationInput;
      where?: TransactionCategoryWhereInput | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyTransactions: <T = BatchPayload>(
    args: {
      data: TransactionUpdateManyMutationInput;
      where?: TransactionWhereInput | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyRoles: <T = BatchPayload>(
    args: { data: RoleUpdateManyMutationInput; where?: RoleWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyAnalyticMetrics: <T = BatchPayload>(
    args: {
      data: AnalyticMetricUpdateManyMutationInput;
      where?: AnalyticMetricWhereInput | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  updateManyPeriods: <T = BatchPayload>(
    args: {
      data: PeriodUpdateManyMutationInput;
      where?: PeriodWhereInput | null;
    },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyUserCredentials: <T = BatchPayload>(
    args: { where?: UserCredentialWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyCurrencies: <T = BatchPayload>(
    args: { where?: CurrencyWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyTransactionCategories: <T = BatchPayload>(
    args: { where?: TransactionCategoryWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyTransactions: <T = BatchPayload>(
    args: { where?: TransactionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyDistributingMetricItems: <T = BatchPayload>(
    args: { where?: DistributingMetricItemWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyRoles: <T = BatchPayload>(
    args: { where?: RoleWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyAnalyticMetrics: <T = BatchPayload>(
    args: { where?: AnalyticMetricWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
  deleteManyPeriods: <T = BatchPayload>(
    args: { where?: PeriodWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
}

export interface Subscription {
  userCredential: <T = UserCredentialSubscriptionPayload | null>(
    args: { where?: UserCredentialSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  currency: <T = CurrencySubscriptionPayload | null>(
    args: { where?: CurrencySubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  transactionCategory: <T = TransactionCategorySubscriptionPayload | null>(
    args: { where?: TransactionCategorySubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  transaction: <T = TransactionSubscriptionPayload | null>(
    args: { where?: TransactionSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  distributingMetricItem: <
    T = DistributingMetricItemSubscriptionPayload | null
  >(
    args: { where?: DistributingMetricItemSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  role: <T = RoleSubscriptionPayload | null>(
    args: { where?: RoleSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  analyticMetric: <T = AnalyticMetricSubscriptionPayload | null>(
    args: { where?: AnalyticMetricSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
  period: <T = PeriodSubscriptionPayload | null>(
    args: { where?: PeriodSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
}

export interface Exists {
  UserCredential: (where?: UserCredentialWhereInput) => Promise<boolean>;
  Currency: (where?: CurrencyWhereInput) => Promise<boolean>;
  TransactionCategory: (
    where?: TransactionCategoryWhereInput,
  ) => Promise<boolean>;
  Transaction: (where?: TransactionWhereInput) => Promise<boolean>;
  DistributingMetricItem: (
    where?: DistributingMetricItemWhereInput,
  ) => Promise<boolean>;
  Role: (where?: RoleWhereInput) => Promise<boolean>;
  AnalyticMetric: (where?: AnalyticMetricWhereInput) => Promise<boolean>;
  Period: (where?: PeriodWhereInput) => Promise<boolean>;
}

export interface Prisma {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  exists: Exists;
  request: <T = any>(
    query: string,
    variables?: { [key: string]: any },
  ) => Promise<T>;
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<any>;
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new (options: BasePrismaOptions): T;
}
/**
 * Type Defs
 */

const typeDefs = `type AggregateAnalyticMetric {
  count: Int!
}

type AggregateCurrency {
  count: Int!
}

type AggregateDistributingMetricItem {
  count: Int!
}

type AggregatePeriod {
  count: Int!
}

type AggregateRole {
  count: Int!
}

type AggregateTransaction {
  count: Int!
}

type AggregateTransactionCategory {
  count: Int!
}

type AggregateUserCredential {
  count: Int!
}

type AnalyticMetric implements Node {
  id: ID!
  name: String!
}

"""A connection to a list of items."""
type AnalyticMetricConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [AnalyticMetricEdge]!
  aggregate: AggregateAnalyticMetric!
}

input AnalyticMetricCreateInput {
  id: ID
  name: String!
}

input AnalyticMetricCreateOneInput {
  create: AnalyticMetricCreateInput
  connect: AnalyticMetricWhereUniqueInput
}

"""An edge in a connection."""
type AnalyticMetricEdge {
  """The item at the end of the edge."""
  node: AnalyticMetric!

  """A cursor for use in pagination."""
  cursor: String!
}

enum AnalyticMetricOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type AnalyticMetricPreviousValues {
  id: ID!
  name: String!
}

type AnalyticMetricSubscriptionPayload {
  mutation: MutationType!
  node: AnalyticMetric
  updatedFields: [String!]
  previousValues: AnalyticMetricPreviousValues
}

input AnalyticMetricSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [AnalyticMetricSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [AnalyticMetricSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AnalyticMetricSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AnalyticMetricWhereInput
}

input AnalyticMetricUpdateDataInput {
  name: String
}

input AnalyticMetricUpdateInput {
  name: String
}

input AnalyticMetricUpdateManyMutationInput {
  name: String
}

input AnalyticMetricUpdateOneRequiredInput {
  create: AnalyticMetricCreateInput
  connect: AnalyticMetricWhereUniqueInput
  update: AnalyticMetricUpdateDataInput
  upsert: AnalyticMetricUpsertNestedInput
}

input AnalyticMetricUpsertNestedInput {
  update: AnalyticMetricUpdateDataInput!
  create: AnalyticMetricCreateInput!
}

input AnalyticMetricWhereInput {
  """Logical AND on all given filters."""
  AND: [AnalyticMetricWhereInput!]

  """Logical OR on all given filters."""
  OR: [AnalyticMetricWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AnalyticMetricWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
}

input AnalyticMetricWhereUniqueInput {
  id: ID
  name: String
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Currency implements Node {
  id: ID!
  name: String!
  code: String!
  distributingMetricItems(where: DistributingMetricItemWhereInput, orderBy: DistributingMetricItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DistributingMetricItem!]
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
}

"""A connection to a list of items."""
type CurrencyConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CurrencyEdge]!
  aggregate: AggregateCurrency!
}

input CurrencyCreateInput {
  id: ID
  name: String!
  code: String!
  distributingMetricItems: DistributingMetricItemCreateManyWithoutBaseCurrencyInput
  transactions: TransactionCreateManyWithoutCurrencyInput
}

input CurrencyCreateOneWithoutDistributingMetricItemsInput {
  create: CurrencyCreateWithoutDistributingMetricItemsInput
  connect: CurrencyWhereUniqueInput
}

input CurrencyCreateOneWithoutTransactionsInput {
  create: CurrencyCreateWithoutTransactionsInput
  connect: CurrencyWhereUniqueInput
}

input CurrencyCreateWithoutDistributingMetricItemsInput {
  id: ID
  name: String!
  code: String!
  transactions: TransactionCreateManyWithoutCurrencyInput
}

input CurrencyCreateWithoutTransactionsInput {
  id: ID
  name: String!
  code: String!
  distributingMetricItems: DistributingMetricItemCreateManyWithoutBaseCurrencyInput
}

"""An edge in a connection."""
type CurrencyEdge {
  """The item at the end of the edge."""
  node: Currency!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CurrencyOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  code_ASC
  code_DESC
}

type CurrencyPreviousValues {
  id: ID!
  name: String!
  code: String!
}

type CurrencySubscriptionPayload {
  mutation: MutationType!
  node: Currency
  updatedFields: [String!]
  previousValues: CurrencyPreviousValues
}

input CurrencySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CurrencySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CurrencySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CurrencySubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CurrencyWhereInput
}

input CurrencyUpdateInput {
  name: String
  code: String
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutBaseCurrencyInput
  transactions: TransactionUpdateManyWithoutCurrencyInput
}

input CurrencyUpdateManyMutationInput {
  name: String
  code: String
}

input CurrencyUpdateOneRequiredWithoutTransactionsInput {
  create: CurrencyCreateWithoutTransactionsInput
  connect: CurrencyWhereUniqueInput
  update: CurrencyUpdateWithoutTransactionsDataInput
  upsert: CurrencyUpsertWithoutTransactionsInput
}

input CurrencyUpdateOneWithoutDistributingMetricItemsInput {
  create: CurrencyCreateWithoutDistributingMetricItemsInput
  connect: CurrencyWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: CurrencyUpdateWithoutDistributingMetricItemsDataInput
  upsert: CurrencyUpsertWithoutDistributingMetricItemsInput
}

input CurrencyUpdateWithoutDistributingMetricItemsDataInput {
  name: String
  code: String
  transactions: TransactionUpdateManyWithoutCurrencyInput
}

input CurrencyUpdateWithoutTransactionsDataInput {
  name: String
  code: String
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutBaseCurrencyInput
}

input CurrencyUpsertWithoutDistributingMetricItemsInput {
  update: CurrencyUpdateWithoutDistributingMetricItemsDataInput!
  create: CurrencyCreateWithoutDistributingMetricItemsInput!
}

input CurrencyUpsertWithoutTransactionsInput {
  update: CurrencyUpdateWithoutTransactionsDataInput!
  create: CurrencyCreateWithoutTransactionsInput!
}

input CurrencyWhereInput {
  """Logical AND on all given filters."""
  AND: [CurrencyWhereInput!]

  """Logical OR on all given filters."""
  OR: [CurrencyWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CurrencyWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  code: String

  """All values that are not equal to given value."""
  code_not: String

  """All values that are contained in given list."""
  code_in: [String!]

  """All values that are not contained in given list."""
  code_not_in: [String!]

  """All values less than the given value."""
  code_lt: String

  """All values less than or equal the given value."""
  code_lte: String

  """All values greater than the given value."""
  code_gt: String

  """All values greater than or equal the given value."""
  code_gte: String

  """All values containing the given string."""
  code_contains: String

  """All values not containing the given string."""
  code_not_contains: String

  """All values starting with the given string."""
  code_starts_with: String

  """All values not starting with the given string."""
  code_not_starts_with: String

  """All values ending with the given string."""
  code_ends_with: String

  """All values not ending with the given string."""
  code_not_ends_with: String
  distributingMetricItems_every: DistributingMetricItemWhereInput
  distributingMetricItems_some: DistributingMetricItemWhereInput
  distributingMetricItems_none: DistributingMetricItemWhereInput
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
}

input CurrencyWhereUniqueInput {
  id: ID
}

scalar DateTime

type DistributingMetricItem implements Node {
  id: ID!
  user: UserCredential!
  period: Period!
  metric: AnalyticMetric!
  category: TransactionCategory
  baseCurrency: Currency
}

"""A connection to a list of items."""
type DistributingMetricItemConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DistributingMetricItemEdge]!
  aggregate: AggregateDistributingMetricItem!
}

input DistributingMetricItemCreateInput {
  id: ID
  user: UserCredentialCreateOneWithoutDistributingMetricItemsInput!
  period: PeriodCreateOneInput!
  metric: AnalyticMetricCreateOneInput!
  category: TransactionCategoryCreateOneWithoutDistributingMetricItemsInput
  baseCurrency: CurrencyCreateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemCreateManyWithoutBaseCurrencyInput {
  create: [DistributingMetricItemCreateWithoutBaseCurrencyInput!]
  connect: [DistributingMetricItemWhereUniqueInput!]
}

input DistributingMetricItemCreateManyWithoutCategoryInput {
  create: [DistributingMetricItemCreateWithoutCategoryInput!]
  connect: [DistributingMetricItemWhereUniqueInput!]
}

input DistributingMetricItemCreateManyWithoutUserInput {
  create: [DistributingMetricItemCreateWithoutUserInput!]
  connect: [DistributingMetricItemWhereUniqueInput!]
}

input DistributingMetricItemCreateWithoutBaseCurrencyInput {
  id: ID
  user: UserCredentialCreateOneWithoutDistributingMetricItemsInput!
  period: PeriodCreateOneInput!
  metric: AnalyticMetricCreateOneInput!
  category: TransactionCategoryCreateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemCreateWithoutCategoryInput {
  id: ID
  user: UserCredentialCreateOneWithoutDistributingMetricItemsInput!
  period: PeriodCreateOneInput!
  metric: AnalyticMetricCreateOneInput!
  baseCurrency: CurrencyCreateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemCreateWithoutUserInput {
  id: ID
  period: PeriodCreateOneInput!
  metric: AnalyticMetricCreateOneInput!
  category: TransactionCategoryCreateOneWithoutDistributingMetricItemsInput
  baseCurrency: CurrencyCreateOneWithoutDistributingMetricItemsInput
}

"""An edge in a connection."""
type DistributingMetricItemEdge {
  """The item at the end of the edge."""
  node: DistributingMetricItem!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DistributingMetricItemOrderByInput {
  id_ASC
  id_DESC
}

type DistributingMetricItemPreviousValues {
  id: ID!
}

input DistributingMetricItemScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [DistributingMetricItemScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [DistributingMetricItemScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DistributingMetricItemScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
}

type DistributingMetricItemSubscriptionPayload {
  mutation: MutationType!
  node: DistributingMetricItem
  updatedFields: [String!]
  previousValues: DistributingMetricItemPreviousValues
}

input DistributingMetricItemSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DistributingMetricItemSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DistributingMetricItemSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DistributingMetricItemSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DistributingMetricItemWhereInput
}

input DistributingMetricItemUpdateInput {
  user: UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput
  period: PeriodUpdateOneRequiredInput
  metric: AnalyticMetricUpdateOneRequiredInput
  category: TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput
  baseCurrency: CurrencyUpdateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemUpdateManyWithoutBaseCurrencyInput {
  create: [DistributingMetricItemCreateWithoutBaseCurrencyInput!]
  connect: [DistributingMetricItemWhereUniqueInput!]
  set: [DistributingMetricItemWhereUniqueInput!]
  disconnect: [DistributingMetricItemWhereUniqueInput!]
  delete: [DistributingMetricItemWhereUniqueInput!]
  update: [DistributingMetricItemUpdateWithWhereUniqueWithoutBaseCurrencyInput!]
  deleteMany: [DistributingMetricItemScalarWhereInput!]
  upsert: [DistributingMetricItemUpsertWithWhereUniqueWithoutBaseCurrencyInput!]
}

input DistributingMetricItemUpdateManyWithoutCategoryInput {
  create: [DistributingMetricItemCreateWithoutCategoryInput!]
  connect: [DistributingMetricItemWhereUniqueInput!]
  set: [DistributingMetricItemWhereUniqueInput!]
  disconnect: [DistributingMetricItemWhereUniqueInput!]
  delete: [DistributingMetricItemWhereUniqueInput!]
  update: [DistributingMetricItemUpdateWithWhereUniqueWithoutCategoryInput!]
  deleteMany: [DistributingMetricItemScalarWhereInput!]
  upsert: [DistributingMetricItemUpsertWithWhereUniqueWithoutCategoryInput!]
}

input DistributingMetricItemUpdateManyWithoutUserInput {
  create: [DistributingMetricItemCreateWithoutUserInput!]
  connect: [DistributingMetricItemWhereUniqueInput!]
  set: [DistributingMetricItemWhereUniqueInput!]
  disconnect: [DistributingMetricItemWhereUniqueInput!]
  delete: [DistributingMetricItemWhereUniqueInput!]
  update: [DistributingMetricItemUpdateWithWhereUniqueWithoutUserInput!]
  deleteMany: [DistributingMetricItemScalarWhereInput!]
  upsert: [DistributingMetricItemUpsertWithWhereUniqueWithoutUserInput!]
}

input DistributingMetricItemUpdateWithoutBaseCurrencyDataInput {
  user: UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput
  period: PeriodUpdateOneRequiredInput
  metric: AnalyticMetricUpdateOneRequiredInput
  category: TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemUpdateWithoutCategoryDataInput {
  user: UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput
  period: PeriodUpdateOneRequiredInput
  metric: AnalyticMetricUpdateOneRequiredInput
  baseCurrency: CurrencyUpdateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemUpdateWithoutUserDataInput {
  period: PeriodUpdateOneRequiredInput
  metric: AnalyticMetricUpdateOneRequiredInput
  category: TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput
  baseCurrency: CurrencyUpdateOneWithoutDistributingMetricItemsInput
}

input DistributingMetricItemUpdateWithWhereUniqueWithoutBaseCurrencyInput {
  where: DistributingMetricItemWhereUniqueInput!
  data: DistributingMetricItemUpdateWithoutBaseCurrencyDataInput!
}

input DistributingMetricItemUpdateWithWhereUniqueWithoutCategoryInput {
  where: DistributingMetricItemWhereUniqueInput!
  data: DistributingMetricItemUpdateWithoutCategoryDataInput!
}

input DistributingMetricItemUpdateWithWhereUniqueWithoutUserInput {
  where: DistributingMetricItemWhereUniqueInput!
  data: DistributingMetricItemUpdateWithoutUserDataInput!
}

input DistributingMetricItemUpsertWithWhereUniqueWithoutBaseCurrencyInput {
  where: DistributingMetricItemWhereUniqueInput!
  update: DistributingMetricItemUpdateWithoutBaseCurrencyDataInput!
  create: DistributingMetricItemCreateWithoutBaseCurrencyInput!
}

input DistributingMetricItemUpsertWithWhereUniqueWithoutCategoryInput {
  where: DistributingMetricItemWhereUniqueInput!
  update: DistributingMetricItemUpdateWithoutCategoryDataInput!
  create: DistributingMetricItemCreateWithoutCategoryInput!
}

input DistributingMetricItemUpsertWithWhereUniqueWithoutUserInput {
  where: DistributingMetricItemWhereUniqueInput!
  update: DistributingMetricItemUpdateWithoutUserDataInput!
  create: DistributingMetricItemCreateWithoutUserInput!
}

input DistributingMetricItemWhereInput {
  """Logical AND on all given filters."""
  AND: [DistributingMetricItemWhereInput!]

  """Logical OR on all given filters."""
  OR: [DistributingMetricItemWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DistributingMetricItemWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  user: UserCredentialWhereInput
  period: PeriodWhereInput
  metric: AnalyticMetricWhereInput
  category: TransactionCategoryWhereInput
  baseCurrency: CurrencyWhereInput
}

input DistributingMetricItemWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUserCredential(data: UserCredentialCreateInput!): UserCredential!
  createCurrency(data: CurrencyCreateInput!): Currency!
  createTransactionCategory(data: TransactionCategoryCreateInput!): TransactionCategory!
  createTransaction(data: TransactionCreateInput!): Transaction!
  createDistributingMetricItem(data: DistributingMetricItemCreateInput!): DistributingMetricItem!
  createRole(data: RoleCreateInput!): Role!
  createAnalyticMetric(data: AnalyticMetricCreateInput!): AnalyticMetric!
  createPeriod(data: PeriodCreateInput!): Period!
  updateUserCredential(data: UserCredentialUpdateInput!, where: UserCredentialWhereUniqueInput!): UserCredential
  updateCurrency(data: CurrencyUpdateInput!, where: CurrencyWhereUniqueInput!): Currency
  updateTransactionCategory(data: TransactionCategoryUpdateInput!, where: TransactionCategoryWhereUniqueInput!): TransactionCategory
  updateTransaction(data: TransactionUpdateInput!, where: TransactionWhereUniqueInput!): Transaction
  updateDistributingMetricItem(data: DistributingMetricItemUpdateInput!, where: DistributingMetricItemWhereUniqueInput!): DistributingMetricItem
  updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
  updateAnalyticMetric(data: AnalyticMetricUpdateInput!, where: AnalyticMetricWhereUniqueInput!): AnalyticMetric
  updatePeriod(data: PeriodUpdateInput!, where: PeriodWhereUniqueInput!): Period
  deleteUserCredential(where: UserCredentialWhereUniqueInput!): UserCredential
  deleteCurrency(where: CurrencyWhereUniqueInput!): Currency
  deleteTransactionCategory(where: TransactionCategoryWhereUniqueInput!): TransactionCategory
  deleteTransaction(where: TransactionWhereUniqueInput!): Transaction
  deleteDistributingMetricItem(where: DistributingMetricItemWhereUniqueInput!): DistributingMetricItem
  deleteRole(where: RoleWhereUniqueInput!): Role
  deleteAnalyticMetric(where: AnalyticMetricWhereUniqueInput!): AnalyticMetric
  deletePeriod(where: PeriodWhereUniqueInput!): Period
  upsertUserCredential(where: UserCredentialWhereUniqueInput!, create: UserCredentialCreateInput!, update: UserCredentialUpdateInput!): UserCredential!
  upsertCurrency(where: CurrencyWhereUniqueInput!, create: CurrencyCreateInput!, update: CurrencyUpdateInput!): Currency!
  upsertTransactionCategory(where: TransactionCategoryWhereUniqueInput!, create: TransactionCategoryCreateInput!, update: TransactionCategoryUpdateInput!): TransactionCategory!
  upsertTransaction(where: TransactionWhereUniqueInput!, create: TransactionCreateInput!, update: TransactionUpdateInput!): Transaction!
  upsertDistributingMetricItem(where: DistributingMetricItemWhereUniqueInput!, create: DistributingMetricItemCreateInput!, update: DistributingMetricItemUpdateInput!): DistributingMetricItem!
  upsertRole(where: RoleWhereUniqueInput!, create: RoleCreateInput!, update: RoleUpdateInput!): Role!
  upsertAnalyticMetric(where: AnalyticMetricWhereUniqueInput!, create: AnalyticMetricCreateInput!, update: AnalyticMetricUpdateInput!): AnalyticMetric!
  upsertPeriod(where: PeriodWhereUniqueInput!, create: PeriodCreateInput!, update: PeriodUpdateInput!): Period!
  updateManyUserCredentials(data: UserCredentialUpdateManyMutationInput!, where: UserCredentialWhereInput): BatchPayload!
  updateManyCurrencies(data: CurrencyUpdateManyMutationInput!, where: CurrencyWhereInput): BatchPayload!
  updateManyTransactionCategories(data: TransactionCategoryUpdateManyMutationInput!, where: TransactionCategoryWhereInput): BatchPayload!
  updateManyTransactions(data: TransactionUpdateManyMutationInput!, where: TransactionWhereInput): BatchPayload!
  updateManyRoles(data: RoleUpdateManyMutationInput!, where: RoleWhereInput): BatchPayload!
  updateManyAnalyticMetrics(data: AnalyticMetricUpdateManyMutationInput!, where: AnalyticMetricWhereInput): BatchPayload!
  updateManyPeriods(data: PeriodUpdateManyMutationInput!, where: PeriodWhereInput): BatchPayload!
  deleteManyUserCredentials(where: UserCredentialWhereInput): BatchPayload!
  deleteManyCurrencies(where: CurrencyWhereInput): BatchPayload!
  deleteManyTransactionCategories(where: TransactionCategoryWhereInput): BatchPayload!
  deleteManyTransactions(where: TransactionWhereInput): BatchPayload!
  deleteManyDistributingMetricItems(where: DistributingMetricItemWhereInput): BatchPayload!
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
  deleteManyAnalyticMetrics(where: AnalyticMetricWhereInput): BatchPayload!
  deleteManyPeriods(where: PeriodWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Period implements Node {
  id: ID!
  name: String!
}

"""A connection to a list of items."""
type PeriodConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PeriodEdge]!
  aggregate: AggregatePeriod!
}

input PeriodCreateInput {
  id: ID
  name: String!
}

input PeriodCreateOneInput {
  create: PeriodCreateInput
  connect: PeriodWhereUniqueInput
}

"""An edge in a connection."""
type PeriodEdge {
  """The item at the end of the edge."""
  node: Period!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PeriodOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type PeriodPreviousValues {
  id: ID!
  name: String!
}

type PeriodSubscriptionPayload {
  mutation: MutationType!
  node: Period
  updatedFields: [String!]
  previousValues: PeriodPreviousValues
}

input PeriodSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PeriodSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PeriodSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PeriodSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PeriodWhereInput
}

input PeriodUpdateDataInput {
  name: String
}

input PeriodUpdateInput {
  name: String
}

input PeriodUpdateManyMutationInput {
  name: String
}

input PeriodUpdateOneRequiredInput {
  create: PeriodCreateInput
  connect: PeriodWhereUniqueInput
  update: PeriodUpdateDataInput
  upsert: PeriodUpsertNestedInput
}

input PeriodUpsertNestedInput {
  update: PeriodUpdateDataInput!
  create: PeriodCreateInput!
}

input PeriodWhereInput {
  """Logical AND on all given filters."""
  AND: [PeriodWhereInput!]

  """Logical OR on all given filters."""
  OR: [PeriodWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PeriodWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
}

input PeriodWhereUniqueInput {
  id: ID
  name: String
}

type Query {
  userCredentials(where: UserCredentialWhereInput, orderBy: UserCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserCredential]!
  currencies(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Currency]!
  transactionCategories(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionCategory]!
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction]!
  distributingMetricItems(where: DistributingMetricItemWhereInput, orderBy: DistributingMetricItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DistributingMetricItem]!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  analyticMetrics(where: AnalyticMetricWhereInput, orderBy: AnalyticMetricOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AnalyticMetric]!
  periods(where: PeriodWhereInput, orderBy: PeriodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Period]!
  userCredential(where: UserCredentialWhereUniqueInput!): UserCredential
  currency(where: CurrencyWhereUniqueInput!): Currency
  transactionCategory(where: TransactionCategoryWhereUniqueInput!): TransactionCategory
  transaction(where: TransactionWhereUniqueInput!): Transaction
  distributingMetricItem(where: DistributingMetricItemWhereUniqueInput!): DistributingMetricItem
  role(where: RoleWhereUniqueInput!): Role
  analyticMetric(where: AnalyticMetricWhereUniqueInput!): AnalyticMetric
  period(where: PeriodWhereUniqueInput!): Period
  userCredentialsConnection(where: UserCredentialWhereInput, orderBy: UserCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserCredentialConnection!
  currenciesConnection(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CurrencyConnection!
  transactionCategoriesConnection(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionCategoryConnection!
  transactionsConnection(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionConnection!
  distributingMetricItemsConnection(where: DistributingMetricItemWhereInput, orderBy: DistributingMetricItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DistributingMetricItemConnection!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  analyticMetricsConnection(where: AnalyticMetricWhereInput, orderBy: AnalyticMetricOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnalyticMetricConnection!
  periodsConnection(where: PeriodWhereInput, orderBy: PeriodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PeriodConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Role implements Node {
  id: ID!
  name: String!
}

"""A connection to a list of items."""
type RoleConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [RoleEdge]!
  aggregate: AggregateRole!
}

input RoleCreateInput {
  id: ID
  name: String!
}

input RoleCreateManyInput {
  create: [RoleCreateInput!]
  connect: [RoleWhereUniqueInput!]
}

"""An edge in a connection."""
type RoleEdge {
  """The item at the end of the edge."""
  node: Role!

  """A cursor for use in pagination."""
  cursor: String!
}

enum RoleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type RolePreviousValues {
  id: ID!
  name: String!
}

input RoleScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
}

type RoleSubscriptionPayload {
  mutation: MutationType!
  node: Role
  updatedFields: [String!]
  previousValues: RolePreviousValues
}

input RoleSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: RoleWhereInput
}

input RoleUpdateDataInput {
  name: String
}

input RoleUpdateInput {
  name: String
}

input RoleUpdateManyDataInput {
  name: String
}

input RoleUpdateManyInput {
  create: [RoleCreateInput!]
  connect: [RoleWhereUniqueInput!]
  set: [RoleWhereUniqueInput!]
  disconnect: [RoleWhereUniqueInput!]
  delete: [RoleWhereUniqueInput!]
  update: [RoleUpdateWithWhereUniqueNestedInput!]
  updateMany: [RoleUpdateManyWithWhereNestedInput!]
  deleteMany: [RoleScalarWhereInput!]
  upsert: [RoleUpsertWithWhereUniqueNestedInput!]
}

input RoleUpdateManyMutationInput {
  name: String
}

input RoleUpdateManyWithWhereNestedInput {
  where: RoleScalarWhereInput!
  data: RoleUpdateManyDataInput!
}

input RoleUpdateWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput!
  data: RoleUpdateDataInput!
}

input RoleUpsertWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput!
  update: RoleUpdateDataInput!
  create: RoleCreateInput!
}

input RoleWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
}

input RoleWhereUniqueInput {
  id: ID
  name: String
}

type Subscription {
  userCredential(where: UserCredentialSubscriptionWhereInput): UserCredentialSubscriptionPayload
  currency(where: CurrencySubscriptionWhereInput): CurrencySubscriptionPayload
  transactionCategory(where: TransactionCategorySubscriptionWhereInput): TransactionCategorySubscriptionPayload
  transaction(where: TransactionSubscriptionWhereInput): TransactionSubscriptionPayload
  distributingMetricItem(where: DistributingMetricItemSubscriptionWhereInput): DistributingMetricItemSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  analyticMetric(where: AnalyticMetricSubscriptionWhereInput): AnalyticMetricSubscriptionPayload
  period(where: PeriodSubscriptionWhereInput): PeriodSubscriptionPayload
}

type Transaction implements Node {
  id: ID!
  datetime: DateTime!
  description: String
  amount: Int!
  owner: UserCredential!
  transactionCategory: TransactionCategory!
  currency: Currency!
}

type TransactionCategory implements Node {
  id: ID!
  name: String!
  parentCategory: TransactionCategory
  owner: UserCredential
  isSystem: Boolean!
  isOutcome: Boolean!
  childCategories(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionCategory!]
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
  distributingMetricItems(where: DistributingMetricItemWhereInput, orderBy: DistributingMetricItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DistributingMetricItem!]
}

"""A connection to a list of items."""
type TransactionCategoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TransactionCategoryEdge]!
  aggregate: AggregateTransactionCategory!
}

input TransactionCategoryCreateInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput
  owner: UserCredentialCreateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
  transactions: TransactionCreateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutCategoryInput
}

input TransactionCategoryCreateManyWithoutOwnerInput {
  create: [TransactionCategoryCreateWithoutOwnerInput!]
  connect: [TransactionCategoryWhereUniqueInput!]
}

input TransactionCategoryCreateManyWithoutParentCategoryInput {
  create: [TransactionCategoryCreateWithoutParentCategoryInput!]
  connect: [TransactionCategoryWhereUniqueInput!]
}

input TransactionCategoryCreateOneWithoutChildCategoriesInput {
  create: TransactionCategoryCreateWithoutChildCategoriesInput
  connect: TransactionCategoryWhereUniqueInput
}

input TransactionCategoryCreateOneWithoutDistributingMetricItemsInput {
  create: TransactionCategoryCreateWithoutDistributingMetricItemsInput
  connect: TransactionCategoryWhereUniqueInput
}

input TransactionCategoryCreateOneWithoutTransactionsInput {
  create: TransactionCategoryCreateWithoutTransactionsInput
  connect: TransactionCategoryWhereUniqueInput
}

input TransactionCategoryCreateWithoutChildCategoriesInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput
  owner: UserCredentialCreateOneWithoutTransactionCategoriesInput
  transactions: TransactionCreateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutCategoryInput
}

input TransactionCategoryCreateWithoutDistributingMetricItemsInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput
  owner: UserCredentialCreateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
  transactions: TransactionCreateManyWithoutTransactionCategoryInput
}

input TransactionCategoryCreateWithoutOwnerInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
  transactions: TransactionCreateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutCategoryInput
}

input TransactionCategoryCreateWithoutParentCategoryInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  owner: UserCredentialCreateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
  transactions: TransactionCreateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutCategoryInput
}

input TransactionCategoryCreateWithoutTransactionsInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput
  owner: UserCredentialCreateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutCategoryInput
}

"""An edge in a connection."""
type TransactionCategoryEdge {
  """The item at the end of the edge."""
  node: TransactionCategory!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TransactionCategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  isSystem_ASC
  isSystem_DESC
  isOutcome_ASC
  isOutcome_DESC
}

type TransactionCategoryPreviousValues {
  id: ID!
  name: String!
  isSystem: Boolean!
  isOutcome: Boolean!
}

input TransactionCategoryScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [TransactionCategoryScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [TransactionCategoryScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TransactionCategoryScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  isSystem: Boolean

  """All values that are not equal to given value."""
  isSystem_not: Boolean
  isOutcome: Boolean

  """All values that are not equal to given value."""
  isOutcome_not: Boolean
}

type TransactionCategorySubscriptionPayload {
  mutation: MutationType!
  node: TransactionCategory
  updatedFields: [String!]
  previousValues: TransactionCategoryPreviousValues
}

input TransactionCategorySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TransactionCategorySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TransactionCategorySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TransactionCategorySubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TransactionCategoryWhereInput
}

input TransactionCategoryUpdateInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryUpdateOneWithoutChildCategoriesInput
  owner: UserCredentialUpdateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
  transactions: TransactionUpdateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutCategoryInput
}

input TransactionCategoryUpdateManyDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
}

input TransactionCategoryUpdateManyMutationInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
}

input TransactionCategoryUpdateManyWithoutOwnerInput {
  create: [TransactionCategoryCreateWithoutOwnerInput!]
  connect: [TransactionCategoryWhereUniqueInput!]
  set: [TransactionCategoryWhereUniqueInput!]
  disconnect: [TransactionCategoryWhereUniqueInput!]
  delete: [TransactionCategoryWhereUniqueInput!]
  update: [TransactionCategoryUpdateWithWhereUniqueWithoutOwnerInput!]
  updateMany: [TransactionCategoryUpdateManyWithWhereNestedInput!]
  deleteMany: [TransactionCategoryScalarWhereInput!]
  upsert: [TransactionCategoryUpsertWithWhereUniqueWithoutOwnerInput!]
}

input TransactionCategoryUpdateManyWithoutParentCategoryInput {
  create: [TransactionCategoryCreateWithoutParentCategoryInput!]
  connect: [TransactionCategoryWhereUniqueInput!]
  set: [TransactionCategoryWhereUniqueInput!]
  disconnect: [TransactionCategoryWhereUniqueInput!]
  delete: [TransactionCategoryWhereUniqueInput!]
  update: [TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput!]
  updateMany: [TransactionCategoryUpdateManyWithWhereNestedInput!]
  deleteMany: [TransactionCategoryScalarWhereInput!]
  upsert: [TransactionCategoryUpsertWithWhereUniqueWithoutParentCategoryInput!]
}

input TransactionCategoryUpdateManyWithWhereNestedInput {
  where: TransactionCategoryScalarWhereInput!
  data: TransactionCategoryUpdateManyDataInput!
}

input TransactionCategoryUpdateOneRequiredWithoutTransactionsInput {
  create: TransactionCategoryCreateWithoutTransactionsInput
  connect: TransactionCategoryWhereUniqueInput
  update: TransactionCategoryUpdateWithoutTransactionsDataInput
  upsert: TransactionCategoryUpsertWithoutTransactionsInput
}

input TransactionCategoryUpdateOneWithoutChildCategoriesInput {
  create: TransactionCategoryCreateWithoutChildCategoriesInput
  connect: TransactionCategoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: TransactionCategoryUpdateWithoutChildCategoriesDataInput
  upsert: TransactionCategoryUpsertWithoutChildCategoriesInput
}

input TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput {
  create: TransactionCategoryCreateWithoutDistributingMetricItemsInput
  connect: TransactionCategoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: TransactionCategoryUpdateWithoutDistributingMetricItemsDataInput
  upsert: TransactionCategoryUpsertWithoutDistributingMetricItemsInput
}

input TransactionCategoryUpdateWithoutChildCategoriesDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryUpdateOneWithoutChildCategoriesInput
  owner: UserCredentialUpdateOneWithoutTransactionCategoriesInput
  transactions: TransactionUpdateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutCategoryInput
}

input TransactionCategoryUpdateWithoutDistributingMetricItemsDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryUpdateOneWithoutChildCategoriesInput
  owner: UserCredentialUpdateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
  transactions: TransactionUpdateManyWithoutTransactionCategoryInput
}

input TransactionCategoryUpdateWithoutOwnerDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryUpdateOneWithoutChildCategoriesInput
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
  transactions: TransactionUpdateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutCategoryInput
}

input TransactionCategoryUpdateWithoutParentCategoryDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  owner: UserCredentialUpdateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
  transactions: TransactionUpdateManyWithoutTransactionCategoryInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutCategoryInput
}

input TransactionCategoryUpdateWithoutTransactionsDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryUpdateOneWithoutChildCategoriesInput
  owner: UserCredentialUpdateOneWithoutTransactionCategoriesInput
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutCategoryInput
}

input TransactionCategoryUpdateWithWhereUniqueWithoutOwnerInput {
  where: TransactionCategoryWhereUniqueInput!
  data: TransactionCategoryUpdateWithoutOwnerDataInput!
}

input TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput {
  where: TransactionCategoryWhereUniqueInput!
  data: TransactionCategoryUpdateWithoutParentCategoryDataInput!
}

input TransactionCategoryUpsertWithoutChildCategoriesInput {
  update: TransactionCategoryUpdateWithoutChildCategoriesDataInput!
  create: TransactionCategoryCreateWithoutChildCategoriesInput!
}

input TransactionCategoryUpsertWithoutDistributingMetricItemsInput {
  update: TransactionCategoryUpdateWithoutDistributingMetricItemsDataInput!
  create: TransactionCategoryCreateWithoutDistributingMetricItemsInput!
}

input TransactionCategoryUpsertWithoutTransactionsInput {
  update: TransactionCategoryUpdateWithoutTransactionsDataInput!
  create: TransactionCategoryCreateWithoutTransactionsInput!
}

input TransactionCategoryUpsertWithWhereUniqueWithoutOwnerInput {
  where: TransactionCategoryWhereUniqueInput!
  update: TransactionCategoryUpdateWithoutOwnerDataInput!
  create: TransactionCategoryCreateWithoutOwnerInput!
}

input TransactionCategoryUpsertWithWhereUniqueWithoutParentCategoryInput {
  where: TransactionCategoryWhereUniqueInput!
  update: TransactionCategoryUpdateWithoutParentCategoryDataInput!
  create: TransactionCategoryCreateWithoutParentCategoryInput!
}

input TransactionCategoryWhereInput {
  """Logical AND on all given filters."""
  AND: [TransactionCategoryWhereInput!]

  """Logical OR on all given filters."""
  OR: [TransactionCategoryWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TransactionCategoryWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  isSystem: Boolean

  """All values that are not equal to given value."""
  isSystem_not: Boolean
  isOutcome: Boolean

  """All values that are not equal to given value."""
  isOutcome_not: Boolean
  parentCategory: TransactionCategoryWhereInput
  owner: UserCredentialWhereInput
  childCategories_every: TransactionCategoryWhereInput
  childCategories_some: TransactionCategoryWhereInput
  childCategories_none: TransactionCategoryWhereInput
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
  distributingMetricItems_every: DistributingMetricItemWhereInput
  distributingMetricItems_some: DistributingMetricItemWhereInput
  distributingMetricItems_none: DistributingMetricItemWhereInput
}

input TransactionCategoryWhereUniqueInput {
  id: ID
}

"""A connection to a list of items."""
type TransactionConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TransactionEdge]!
  aggregate: AggregateTransaction!
}

input TransactionCreateInput {
  id: ID
  datetime: DateTime!
  description: String
  amount: Int!
  owner: UserCredentialCreateOneWithoutTransactionsInput!
  transactionCategory: TransactionCategoryCreateOneWithoutTransactionsInput!
  currency: CurrencyCreateOneWithoutTransactionsInput!
}

input TransactionCreateManyWithoutCurrencyInput {
  create: [TransactionCreateWithoutCurrencyInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateManyWithoutOwnerInput {
  create: [TransactionCreateWithoutOwnerInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateManyWithoutTransactionCategoryInput {
  create: [TransactionCreateWithoutTransactionCategoryInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateWithoutCurrencyInput {
  id: ID
  datetime: DateTime!
  description: String
  amount: Int!
  owner: UserCredentialCreateOneWithoutTransactionsInput!
  transactionCategory: TransactionCategoryCreateOneWithoutTransactionsInput!
}

input TransactionCreateWithoutOwnerInput {
  id: ID
  datetime: DateTime!
  description: String
  amount: Int!
  transactionCategory: TransactionCategoryCreateOneWithoutTransactionsInput!
  currency: CurrencyCreateOneWithoutTransactionsInput!
}

input TransactionCreateWithoutTransactionCategoryInput {
  id: ID
  datetime: DateTime!
  description: String
  amount: Int!
  owner: UserCredentialCreateOneWithoutTransactionsInput!
  currency: CurrencyCreateOneWithoutTransactionsInput!
}

"""An edge in a connection."""
type TransactionEdge {
  """The item at the end of the edge."""
  node: Transaction!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TransactionOrderByInput {
  id_ASC
  id_DESC
  datetime_ASC
  datetime_DESC
  description_ASC
  description_DESC
  amount_ASC
  amount_DESC
}

type TransactionPreviousValues {
  id: ID!
  datetime: DateTime!
  description: String
  amount: Int!
}

input TransactionScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [TransactionScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [TransactionScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TransactionScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  datetime: DateTime

  """All values that are not equal to given value."""
  datetime_not: DateTime

  """All values that are contained in given list."""
  datetime_in: [DateTime!]

  """All values that are not contained in given list."""
  datetime_not_in: [DateTime!]

  """All values less than the given value."""
  datetime_lt: DateTime

  """All values less than or equal the given value."""
  datetime_lte: DateTime

  """All values greater than the given value."""
  datetime_gt: DateTime

  """All values greater than or equal the given value."""
  datetime_gte: DateTime
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  amount: Int

  """All values that are not equal to given value."""
  amount_not: Int

  """All values that are contained in given list."""
  amount_in: [Int!]

  """All values that are not contained in given list."""
  amount_not_in: [Int!]

  """All values less than the given value."""
  amount_lt: Int

  """All values less than or equal the given value."""
  amount_lte: Int

  """All values greater than the given value."""
  amount_gt: Int

  """All values greater than or equal the given value."""
  amount_gte: Int
}

type TransactionSubscriptionPayload {
  mutation: MutationType!
  node: Transaction
  updatedFields: [String!]
  previousValues: TransactionPreviousValues
}

input TransactionSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TransactionSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TransactionSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TransactionSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TransactionWhereInput
}

input TransactionUpdateInput {
  datetime: DateTime
  description: String
  amount: Int
  owner: UserCredentialUpdateOneRequiredWithoutTransactionsInput
  transactionCategory: TransactionCategoryUpdateOneRequiredWithoutTransactionsInput
  currency: CurrencyUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateManyDataInput {
  datetime: DateTime
  description: String
  amount: Int
}

input TransactionUpdateManyMutationInput {
  datetime: DateTime
  description: String
  amount: Int
}

input TransactionUpdateManyWithoutCurrencyInput {
  create: [TransactionCreateWithoutCurrencyInput!]
  connect: [TransactionWhereUniqueInput!]
  set: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  delete: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutCurrencyInput!]
  updateMany: [TransactionUpdateManyWithWhereNestedInput!]
  deleteMany: [TransactionScalarWhereInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutCurrencyInput!]
}

input TransactionUpdateManyWithoutOwnerInput {
  create: [TransactionCreateWithoutOwnerInput!]
  connect: [TransactionWhereUniqueInput!]
  set: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  delete: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutOwnerInput!]
  updateMany: [TransactionUpdateManyWithWhereNestedInput!]
  deleteMany: [TransactionScalarWhereInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutOwnerInput!]
}

input TransactionUpdateManyWithoutTransactionCategoryInput {
  create: [TransactionCreateWithoutTransactionCategoryInput!]
  connect: [TransactionWhereUniqueInput!]
  set: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  delete: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutTransactionCategoryInput!]
  updateMany: [TransactionUpdateManyWithWhereNestedInput!]
  deleteMany: [TransactionScalarWhereInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutTransactionCategoryInput!]
}

input TransactionUpdateManyWithWhereNestedInput {
  where: TransactionScalarWhereInput!
  data: TransactionUpdateManyDataInput!
}

input TransactionUpdateWithoutCurrencyDataInput {
  datetime: DateTime
  description: String
  amount: Int
  owner: UserCredentialUpdateOneRequiredWithoutTransactionsInput
  transactionCategory: TransactionCategoryUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateWithoutOwnerDataInput {
  datetime: DateTime
  description: String
  amount: Int
  transactionCategory: TransactionCategoryUpdateOneRequiredWithoutTransactionsInput
  currency: CurrencyUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateWithoutTransactionCategoryDataInput {
  datetime: DateTime
  description: String
  amount: Int
  owner: UserCredentialUpdateOneRequiredWithoutTransactionsInput
  currency: CurrencyUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateWithWhereUniqueWithoutCurrencyInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutCurrencyDataInput!
}

input TransactionUpdateWithWhereUniqueWithoutOwnerInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutOwnerDataInput!
}

input TransactionUpdateWithWhereUniqueWithoutTransactionCategoryInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutTransactionCategoryDataInput!
}

input TransactionUpsertWithWhereUniqueWithoutCurrencyInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutCurrencyDataInput!
  create: TransactionCreateWithoutCurrencyInput!
}

input TransactionUpsertWithWhereUniqueWithoutOwnerInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutOwnerDataInput!
  create: TransactionCreateWithoutOwnerInput!
}

input TransactionUpsertWithWhereUniqueWithoutTransactionCategoryInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutTransactionCategoryDataInput!
  create: TransactionCreateWithoutTransactionCategoryInput!
}

input TransactionWhereInput {
  """Logical AND on all given filters."""
  AND: [TransactionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TransactionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TransactionWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  datetime: DateTime

  """All values that are not equal to given value."""
  datetime_not: DateTime

  """All values that are contained in given list."""
  datetime_in: [DateTime!]

  """All values that are not contained in given list."""
  datetime_not_in: [DateTime!]

  """All values less than the given value."""
  datetime_lt: DateTime

  """All values less than or equal the given value."""
  datetime_lte: DateTime

  """All values greater than the given value."""
  datetime_gt: DateTime

  """All values greater than or equal the given value."""
  datetime_gte: DateTime
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  amount: Int

  """All values that are not equal to given value."""
  amount_not: Int

  """All values that are contained in given list."""
  amount_in: [Int!]

  """All values that are not contained in given list."""
  amount_not_in: [Int!]

  """All values less than the given value."""
  amount_lt: Int

  """All values less than or equal the given value."""
  amount_lte: Int

  """All values greater than the given value."""
  amount_gt: Int

  """All values greater than or equal the given value."""
  amount_gte: Int
  owner: UserCredentialWhereInput
  transactionCategory: TransactionCategoryWhereInput
  currency: CurrencyWhereInput
}

input TransactionWhereUniqueInput {
  id: ID
}

type UserCredential implements Node {
  id: ID!
  email: String!
  profileImageUrl: String
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role!]
  isActive: Boolean!
  transactionCategories(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionCategory!]
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
  distributingMetricItems(where: DistributingMetricItemWhereInput, orderBy: DistributingMetricItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DistributingMetricItem!]
}

"""A connection to a list of items."""
type UserCredentialConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserCredentialEdge]!
  aggregate: AggregateUserCredential!
}

input UserCredentialCreateInput {
  id: ID
  email: String!
  profileImageUrl: String
  isActive: Boolean
  roles: RoleCreateManyInput
  transactionCategories: TransactionCategoryCreateManyWithoutOwnerInput
  transactions: TransactionCreateManyWithoutOwnerInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutUserInput
}

input UserCredentialCreateOneWithoutDistributingMetricItemsInput {
  create: UserCredentialCreateWithoutDistributingMetricItemsInput
  connect: UserCredentialWhereUniqueInput
}

input UserCredentialCreateOneWithoutTransactionCategoriesInput {
  create: UserCredentialCreateWithoutTransactionCategoriesInput
  connect: UserCredentialWhereUniqueInput
}

input UserCredentialCreateOneWithoutTransactionsInput {
  create: UserCredentialCreateWithoutTransactionsInput
  connect: UserCredentialWhereUniqueInput
}

input UserCredentialCreateWithoutDistributingMetricItemsInput {
  id: ID
  email: String!
  profileImageUrl: String
  isActive: Boolean
  roles: RoleCreateManyInput
  transactionCategories: TransactionCategoryCreateManyWithoutOwnerInput
  transactions: TransactionCreateManyWithoutOwnerInput
}

input UserCredentialCreateWithoutTransactionCategoriesInput {
  id: ID
  email: String!
  profileImageUrl: String
  isActive: Boolean
  roles: RoleCreateManyInput
  transactions: TransactionCreateManyWithoutOwnerInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutUserInput
}

input UserCredentialCreateWithoutTransactionsInput {
  id: ID
  email: String!
  profileImageUrl: String
  isActive: Boolean
  roles: RoleCreateManyInput
  transactionCategories: TransactionCategoryCreateManyWithoutOwnerInput
  distributingMetricItems: DistributingMetricItemCreateManyWithoutUserInput
}

"""An edge in a connection."""
type UserCredentialEdge {
  """The item at the end of the edge."""
  node: UserCredential!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserCredentialOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  profileImageUrl_ASC
  profileImageUrl_DESC
  isActive_ASC
  isActive_DESC
}

type UserCredentialPreviousValues {
  id: ID!
  email: String!
  profileImageUrl: String
  isActive: Boolean!
}

type UserCredentialSubscriptionPayload {
  mutation: MutationType!
  node: UserCredential
  updatedFields: [String!]
  previousValues: UserCredentialPreviousValues
}

input UserCredentialSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserCredentialSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserCredentialSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserCredentialSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserCredentialWhereInput
}

input UserCredentialUpdateInput {
  email: String
  profileImageUrl: String
  isActive: Boolean
  roles: RoleUpdateManyInput
  transactionCategories: TransactionCategoryUpdateManyWithoutOwnerInput
  transactions: TransactionUpdateManyWithoutOwnerInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutUserInput
}

input UserCredentialUpdateManyMutationInput {
  email: String
  profileImageUrl: String
  isActive: Boolean
}

input UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput {
  create: UserCredentialCreateWithoutDistributingMetricItemsInput
  connect: UserCredentialWhereUniqueInput
  update: UserCredentialUpdateWithoutDistributingMetricItemsDataInput
  upsert: UserCredentialUpsertWithoutDistributingMetricItemsInput
}

input UserCredentialUpdateOneRequiredWithoutTransactionsInput {
  create: UserCredentialCreateWithoutTransactionsInput
  connect: UserCredentialWhereUniqueInput
  update: UserCredentialUpdateWithoutTransactionsDataInput
  upsert: UserCredentialUpsertWithoutTransactionsInput
}

input UserCredentialUpdateOneWithoutTransactionCategoriesInput {
  create: UserCredentialCreateWithoutTransactionCategoriesInput
  connect: UserCredentialWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserCredentialUpdateWithoutTransactionCategoriesDataInput
  upsert: UserCredentialUpsertWithoutTransactionCategoriesInput
}

input UserCredentialUpdateWithoutDistributingMetricItemsDataInput {
  email: String
  profileImageUrl: String
  isActive: Boolean
  roles: RoleUpdateManyInput
  transactionCategories: TransactionCategoryUpdateManyWithoutOwnerInput
  transactions: TransactionUpdateManyWithoutOwnerInput
}

input UserCredentialUpdateWithoutTransactionCategoriesDataInput {
  email: String
  profileImageUrl: String
  isActive: Boolean
  roles: RoleUpdateManyInput
  transactions: TransactionUpdateManyWithoutOwnerInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutUserInput
}

input UserCredentialUpdateWithoutTransactionsDataInput {
  email: String
  profileImageUrl: String
  isActive: Boolean
  roles: RoleUpdateManyInput
  transactionCategories: TransactionCategoryUpdateManyWithoutOwnerInput
  distributingMetricItems: DistributingMetricItemUpdateManyWithoutUserInput
}

input UserCredentialUpsertWithoutDistributingMetricItemsInput {
  update: UserCredentialUpdateWithoutDistributingMetricItemsDataInput!
  create: UserCredentialCreateWithoutDistributingMetricItemsInput!
}

input UserCredentialUpsertWithoutTransactionCategoriesInput {
  update: UserCredentialUpdateWithoutTransactionCategoriesDataInput!
  create: UserCredentialCreateWithoutTransactionCategoriesInput!
}

input UserCredentialUpsertWithoutTransactionsInput {
  update: UserCredentialUpdateWithoutTransactionsDataInput!
  create: UserCredentialCreateWithoutTransactionsInput!
}

input UserCredentialWhereInput {
  """Logical AND on all given filters."""
  AND: [UserCredentialWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserCredentialWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserCredentialWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  profileImageUrl: String

  """All values that are not equal to given value."""
  profileImageUrl_not: String

  """All values that are contained in given list."""
  profileImageUrl_in: [String!]

  """All values that are not contained in given list."""
  profileImageUrl_not_in: [String!]

  """All values less than the given value."""
  profileImageUrl_lt: String

  """All values less than or equal the given value."""
  profileImageUrl_lte: String

  """All values greater than the given value."""
  profileImageUrl_gt: String

  """All values greater than or equal the given value."""
  profileImageUrl_gte: String

  """All values containing the given string."""
  profileImageUrl_contains: String

  """All values not containing the given string."""
  profileImageUrl_not_contains: String

  """All values starting with the given string."""
  profileImageUrl_starts_with: String

  """All values not starting with the given string."""
  profileImageUrl_not_starts_with: String

  """All values ending with the given string."""
  profileImageUrl_ends_with: String

  """All values not ending with the given string."""
  profileImageUrl_not_ends_with: String
  isActive: Boolean

  """All values that are not equal to given value."""
  isActive_not: Boolean
  roles_every: RoleWhereInput
  roles_some: RoleWhereInput
  roles_none: RoleWhereInput
  transactionCategories_every: TransactionCategoryWhereInput
  transactionCategories_some: TransactionCategoryWhereInput
  transactionCategories_none: TransactionCategoryWhereInput
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
  distributingMetricItems_every: DistributingMetricItemWhereInput
  distributingMetricItems_some: DistributingMetricItemWhereInput
  distributingMetricItems_none: DistributingMetricItemWhereInput
}

input UserCredentialWhereUniqueInput {
  id: ID
  email: String
}
`;

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({
  typeDefs,
});

/**
 * Types
 */

export type AnalyticMetricOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC';

export type CurrencyOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'code_ASC'
  | 'code_DESC';

export type DistributingMetricItemOrderByInput = 'id_ASC' | 'id_DESC';

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export type PeriodOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC';

export type RoleOrderByInput = 'id_ASC' | 'id_DESC' | 'name_ASC' | 'name_DESC';

export type TransactionCategoryOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'isSystem_ASC'
  | 'isSystem_DESC'
  | 'isOutcome_ASC'
  | 'isOutcome_DESC';

export type TransactionOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'datetime_ASC'
  | 'datetime_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'amount_ASC'
  | 'amount_DESC';

export type UserCredentialOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'profileImageUrl_ASC'
  | 'profileImageUrl_DESC'
  | 'isActive_ASC'
  | 'isActive_DESC';

export interface AnalyticMetricCreateInput {
  id?: ID_Input | null;
  name: String;
}

export interface AnalyticMetricCreateOneInput {
  create?: AnalyticMetricCreateInput | null;
  connect?: AnalyticMetricWhereUniqueInput | null;
}

export interface AnalyticMetricSubscriptionWhereInput {
  AND?:
    | AnalyticMetricSubscriptionWhereInput[]
    | AnalyticMetricSubscriptionWhereInput
    | null;
  OR?:
    | AnalyticMetricSubscriptionWhereInput[]
    | AnalyticMetricSubscriptionWhereInput
    | null;
  NOT?:
    | AnalyticMetricSubscriptionWhereInput[]
    | AnalyticMetricSubscriptionWhereInput
    | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: AnalyticMetricWhereInput | null;
}

export interface AnalyticMetricUpdateDataInput {
  name?: String | null;
}

export interface AnalyticMetricUpdateInput {
  name?: String | null;
}

export interface AnalyticMetricUpdateManyMutationInput {
  name?: String | null;
}

export interface AnalyticMetricUpdateOneRequiredInput {
  create?: AnalyticMetricCreateInput | null;
  connect?: AnalyticMetricWhereUniqueInput | null;
  update?: AnalyticMetricUpdateDataInput | null;
  upsert?: AnalyticMetricUpsertNestedInput | null;
}

export interface AnalyticMetricUpsertNestedInput {
  update: AnalyticMetricUpdateDataInput;
  create: AnalyticMetricCreateInput;
}

export interface AnalyticMetricWhereInput {
  AND?: AnalyticMetricWhereInput[] | AnalyticMetricWhereInput | null;
  OR?: AnalyticMetricWhereInput[] | AnalyticMetricWhereInput | null;
  NOT?: AnalyticMetricWhereInput[] | AnalyticMetricWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
}

export interface AnalyticMetricWhereUniqueInput {
  id?: ID_Input | null;
  name?: String | null;
}

export interface CurrencyCreateInput {
  id?: ID_Input | null;
  name: String;
  code: String;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutBaseCurrencyInput | null;
  transactions?: TransactionCreateManyWithoutCurrencyInput | null;
}

export interface CurrencyCreateOneWithoutDistributingMetricItemsInput {
  create?: CurrencyCreateWithoutDistributingMetricItemsInput | null;
  connect?: CurrencyWhereUniqueInput | null;
}

export interface CurrencyCreateOneWithoutTransactionsInput {
  create?: CurrencyCreateWithoutTransactionsInput | null;
  connect?: CurrencyWhereUniqueInput | null;
}

export interface CurrencyCreateWithoutDistributingMetricItemsInput {
  id?: ID_Input | null;
  name: String;
  code: String;
  transactions?: TransactionCreateManyWithoutCurrencyInput | null;
}

export interface CurrencyCreateWithoutTransactionsInput {
  id?: ID_Input | null;
  name: String;
  code: String;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutBaseCurrencyInput | null;
}

export interface CurrencySubscriptionWhereInput {
  AND?:
    | CurrencySubscriptionWhereInput[]
    | CurrencySubscriptionWhereInput
    | null;
  OR?: CurrencySubscriptionWhereInput[] | CurrencySubscriptionWhereInput | null;
  NOT?:
    | CurrencySubscriptionWhereInput[]
    | CurrencySubscriptionWhereInput
    | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: CurrencyWhereInput | null;
}

export interface CurrencyUpdateInput {
  name?: String | null;
  code?: String | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutBaseCurrencyInput | null;
  transactions?: TransactionUpdateManyWithoutCurrencyInput | null;
}

export interface CurrencyUpdateManyMutationInput {
  name?: String | null;
  code?: String | null;
}

export interface CurrencyUpdateOneRequiredWithoutTransactionsInput {
  create?: CurrencyCreateWithoutTransactionsInput | null;
  connect?: CurrencyWhereUniqueInput | null;
  update?: CurrencyUpdateWithoutTransactionsDataInput | null;
  upsert?: CurrencyUpsertWithoutTransactionsInput | null;
}

export interface CurrencyUpdateOneWithoutDistributingMetricItemsInput {
  create?: CurrencyCreateWithoutDistributingMetricItemsInput | null;
  connect?: CurrencyWhereUniqueInput | null;
  disconnect?: Boolean | null;
  delete?: Boolean | null;
  update?: CurrencyUpdateWithoutDistributingMetricItemsDataInput | null;
  upsert?: CurrencyUpsertWithoutDistributingMetricItemsInput | null;
}

export interface CurrencyUpdateWithoutDistributingMetricItemsDataInput {
  name?: String | null;
  code?: String | null;
  transactions?: TransactionUpdateManyWithoutCurrencyInput | null;
}

export interface CurrencyUpdateWithoutTransactionsDataInput {
  name?: String | null;
  code?: String | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutBaseCurrencyInput | null;
}

export interface CurrencyUpsertWithoutDistributingMetricItemsInput {
  update: CurrencyUpdateWithoutDistributingMetricItemsDataInput;
  create: CurrencyCreateWithoutDistributingMetricItemsInput;
}

export interface CurrencyUpsertWithoutTransactionsInput {
  update: CurrencyUpdateWithoutTransactionsDataInput;
  create: CurrencyCreateWithoutTransactionsInput;
}

export interface CurrencyWhereInput {
  AND?: CurrencyWhereInput[] | CurrencyWhereInput | null;
  OR?: CurrencyWhereInput[] | CurrencyWhereInput | null;
  NOT?: CurrencyWhereInput[] | CurrencyWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
  code?: String | null;
  code_not?: String | null;
  code_in?: String[] | String | null;
  code_not_in?: String[] | String | null;
  code_lt?: String | null;
  code_lte?: String | null;
  code_gt?: String | null;
  code_gte?: String | null;
  code_contains?: String | null;
  code_not_contains?: String | null;
  code_starts_with?: String | null;
  code_not_starts_with?: String | null;
  code_ends_with?: String | null;
  code_not_ends_with?: String | null;
  distributingMetricItems_every?: DistributingMetricItemWhereInput | null;
  distributingMetricItems_some?: DistributingMetricItemWhereInput | null;
  distributingMetricItems_none?: DistributingMetricItemWhereInput | null;
  transactions_every?: TransactionWhereInput | null;
  transactions_some?: TransactionWhereInput | null;
  transactions_none?: TransactionWhereInput | null;
}

export interface CurrencyWhereUniqueInput {
  id?: ID_Input | null;
}

export interface DistributingMetricItemCreateInput {
  id?: ID_Input | null;
  user: UserCredentialCreateOneWithoutDistributingMetricItemsInput;
  period: PeriodCreateOneInput;
  metric: AnalyticMetricCreateOneInput;
  category?: TransactionCategoryCreateOneWithoutDistributingMetricItemsInput | null;
  baseCurrency?: CurrencyCreateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemCreateManyWithoutBaseCurrencyInput {
  create?:
    | DistributingMetricItemCreateWithoutBaseCurrencyInput[]
    | DistributingMetricItemCreateWithoutBaseCurrencyInput
    | null;
  connect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
}

export interface DistributingMetricItemCreateManyWithoutCategoryInput {
  create?:
    | DistributingMetricItemCreateWithoutCategoryInput[]
    | DistributingMetricItemCreateWithoutCategoryInput
    | null;
  connect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
}

export interface DistributingMetricItemCreateManyWithoutUserInput {
  create?:
    | DistributingMetricItemCreateWithoutUserInput[]
    | DistributingMetricItemCreateWithoutUserInput
    | null;
  connect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
}

export interface DistributingMetricItemCreateWithoutBaseCurrencyInput {
  id?: ID_Input | null;
  user: UserCredentialCreateOneWithoutDistributingMetricItemsInput;
  period: PeriodCreateOneInput;
  metric: AnalyticMetricCreateOneInput;
  category?: TransactionCategoryCreateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemCreateWithoutCategoryInput {
  id?: ID_Input | null;
  user: UserCredentialCreateOneWithoutDistributingMetricItemsInput;
  period: PeriodCreateOneInput;
  metric: AnalyticMetricCreateOneInput;
  baseCurrency?: CurrencyCreateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemCreateWithoutUserInput {
  id?: ID_Input | null;
  period: PeriodCreateOneInput;
  metric: AnalyticMetricCreateOneInput;
  category?: TransactionCategoryCreateOneWithoutDistributingMetricItemsInput | null;
  baseCurrency?: CurrencyCreateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemScalarWhereInput {
  AND?:
    | DistributingMetricItemScalarWhereInput[]
    | DistributingMetricItemScalarWhereInput
    | null;
  OR?:
    | DistributingMetricItemScalarWhereInput[]
    | DistributingMetricItemScalarWhereInput
    | null;
  NOT?:
    | DistributingMetricItemScalarWhereInput[]
    | DistributingMetricItemScalarWhereInput
    | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
}

export interface DistributingMetricItemSubscriptionWhereInput {
  AND?:
    | DistributingMetricItemSubscriptionWhereInput[]
    | DistributingMetricItemSubscriptionWhereInput
    | null;
  OR?:
    | DistributingMetricItemSubscriptionWhereInput[]
    | DistributingMetricItemSubscriptionWhereInput
    | null;
  NOT?:
    | DistributingMetricItemSubscriptionWhereInput[]
    | DistributingMetricItemSubscriptionWhereInput
    | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: DistributingMetricItemWhereInput | null;
}

export interface DistributingMetricItemUpdateInput {
  user?: UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput | null;
  period?: PeriodUpdateOneRequiredInput | null;
  metric?: AnalyticMetricUpdateOneRequiredInput | null;
  category?: TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput | null;
  baseCurrency?: CurrencyUpdateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemUpdateManyWithoutBaseCurrencyInput {
  create?:
    | DistributingMetricItemCreateWithoutBaseCurrencyInput[]
    | DistributingMetricItemCreateWithoutBaseCurrencyInput
    | null;
  connect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  set?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  disconnect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  delete?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  update?:
    | DistributingMetricItemUpdateWithWhereUniqueWithoutBaseCurrencyInput[]
    | DistributingMetricItemUpdateWithWhereUniqueWithoutBaseCurrencyInput
    | null;
  deleteMany?:
    | DistributingMetricItemScalarWhereInput[]
    | DistributingMetricItemScalarWhereInput
    | null;
  upsert?:
    | DistributingMetricItemUpsertWithWhereUniqueWithoutBaseCurrencyInput[]
    | DistributingMetricItemUpsertWithWhereUniqueWithoutBaseCurrencyInput
    | null;
}

export interface DistributingMetricItemUpdateManyWithoutCategoryInput {
  create?:
    | DistributingMetricItemCreateWithoutCategoryInput[]
    | DistributingMetricItemCreateWithoutCategoryInput
    | null;
  connect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  set?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  disconnect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  delete?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  update?:
    | DistributingMetricItemUpdateWithWhereUniqueWithoutCategoryInput[]
    | DistributingMetricItemUpdateWithWhereUniqueWithoutCategoryInput
    | null;
  deleteMany?:
    | DistributingMetricItemScalarWhereInput[]
    | DistributingMetricItemScalarWhereInput
    | null;
  upsert?:
    | DistributingMetricItemUpsertWithWhereUniqueWithoutCategoryInput[]
    | DistributingMetricItemUpsertWithWhereUniqueWithoutCategoryInput
    | null;
}

export interface DistributingMetricItemUpdateManyWithoutUserInput {
  create?:
    | DistributingMetricItemCreateWithoutUserInput[]
    | DistributingMetricItemCreateWithoutUserInput
    | null;
  connect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  set?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  disconnect?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  delete?:
    | DistributingMetricItemWhereUniqueInput[]
    | DistributingMetricItemWhereUniqueInput
    | null;
  update?:
    | DistributingMetricItemUpdateWithWhereUniqueWithoutUserInput[]
    | DistributingMetricItemUpdateWithWhereUniqueWithoutUserInput
    | null;
  deleteMany?:
    | DistributingMetricItemScalarWhereInput[]
    | DistributingMetricItemScalarWhereInput
    | null;
  upsert?:
    | DistributingMetricItemUpsertWithWhereUniqueWithoutUserInput[]
    | DistributingMetricItemUpsertWithWhereUniqueWithoutUserInput
    | null;
}

export interface DistributingMetricItemUpdateWithoutBaseCurrencyDataInput {
  user?: UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput | null;
  period?: PeriodUpdateOneRequiredInput | null;
  metric?: AnalyticMetricUpdateOneRequiredInput | null;
  category?: TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemUpdateWithoutCategoryDataInput {
  user?: UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput | null;
  period?: PeriodUpdateOneRequiredInput | null;
  metric?: AnalyticMetricUpdateOneRequiredInput | null;
  baseCurrency?: CurrencyUpdateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemUpdateWithoutUserDataInput {
  period?: PeriodUpdateOneRequiredInput | null;
  metric?: AnalyticMetricUpdateOneRequiredInput | null;
  category?: TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput | null;
  baseCurrency?: CurrencyUpdateOneWithoutDistributingMetricItemsInput | null;
}

export interface DistributingMetricItemUpdateWithWhereUniqueWithoutBaseCurrencyInput {
  where: DistributingMetricItemWhereUniqueInput;
  data: DistributingMetricItemUpdateWithoutBaseCurrencyDataInput;
}

export interface DistributingMetricItemUpdateWithWhereUniqueWithoutCategoryInput {
  where: DistributingMetricItemWhereUniqueInput;
  data: DistributingMetricItemUpdateWithoutCategoryDataInput;
}

export interface DistributingMetricItemUpdateWithWhereUniqueWithoutUserInput {
  where: DistributingMetricItemWhereUniqueInput;
  data: DistributingMetricItemUpdateWithoutUserDataInput;
}

export interface DistributingMetricItemUpsertWithWhereUniqueWithoutBaseCurrencyInput {
  where: DistributingMetricItemWhereUniqueInput;
  update: DistributingMetricItemUpdateWithoutBaseCurrencyDataInput;
  create: DistributingMetricItemCreateWithoutBaseCurrencyInput;
}

export interface DistributingMetricItemUpsertWithWhereUniqueWithoutCategoryInput {
  where: DistributingMetricItemWhereUniqueInput;
  update: DistributingMetricItemUpdateWithoutCategoryDataInput;
  create: DistributingMetricItemCreateWithoutCategoryInput;
}

export interface DistributingMetricItemUpsertWithWhereUniqueWithoutUserInput {
  where: DistributingMetricItemWhereUniqueInput;
  update: DistributingMetricItemUpdateWithoutUserDataInput;
  create: DistributingMetricItemCreateWithoutUserInput;
}

export interface DistributingMetricItemWhereInput {
  AND?:
    | DistributingMetricItemWhereInput[]
    | DistributingMetricItemWhereInput
    | null;
  OR?:
    | DistributingMetricItemWhereInput[]
    | DistributingMetricItemWhereInput
    | null;
  NOT?:
    | DistributingMetricItemWhereInput[]
    | DistributingMetricItemWhereInput
    | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  user?: UserCredentialWhereInput | null;
  period?: PeriodWhereInput | null;
  metric?: AnalyticMetricWhereInput | null;
  category?: TransactionCategoryWhereInput | null;
  baseCurrency?: CurrencyWhereInput | null;
}

export interface DistributingMetricItemWhereUniqueInput {
  id?: ID_Input | null;
}

export interface PeriodCreateInput {
  id?: ID_Input | null;
  name: String;
}

export interface PeriodCreateOneInput {
  create?: PeriodCreateInput | null;
  connect?: PeriodWhereUniqueInput | null;
}

export interface PeriodSubscriptionWhereInput {
  AND?: PeriodSubscriptionWhereInput[] | PeriodSubscriptionWhereInput | null;
  OR?: PeriodSubscriptionWhereInput[] | PeriodSubscriptionWhereInput | null;
  NOT?: PeriodSubscriptionWhereInput[] | PeriodSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: PeriodWhereInput | null;
}

export interface PeriodUpdateDataInput {
  name?: String | null;
}

export interface PeriodUpdateInput {
  name?: String | null;
}

export interface PeriodUpdateManyMutationInput {
  name?: String | null;
}

export interface PeriodUpdateOneRequiredInput {
  create?: PeriodCreateInput | null;
  connect?: PeriodWhereUniqueInput | null;
  update?: PeriodUpdateDataInput | null;
  upsert?: PeriodUpsertNestedInput | null;
}

export interface PeriodUpsertNestedInput {
  update: PeriodUpdateDataInput;
  create: PeriodCreateInput;
}

export interface PeriodWhereInput {
  AND?: PeriodWhereInput[] | PeriodWhereInput | null;
  OR?: PeriodWhereInput[] | PeriodWhereInput | null;
  NOT?: PeriodWhereInput[] | PeriodWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
}

export interface PeriodWhereUniqueInput {
  id?: ID_Input | null;
  name?: String | null;
}

export interface RoleCreateInput {
  id?: ID_Input | null;
  name: String;
}

export interface RoleCreateManyInput {
  create?: RoleCreateInput[] | RoleCreateInput | null;
  connect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput | null;
}

export interface RoleScalarWhereInput {
  AND?: RoleScalarWhereInput[] | RoleScalarWhereInput | null;
  OR?: RoleScalarWhereInput[] | RoleScalarWhereInput | null;
  NOT?: RoleScalarWhereInput[] | RoleScalarWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
}

export interface RoleSubscriptionWhereInput {
  AND?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput | null;
  OR?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput | null;
  NOT?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: RoleWhereInput | null;
}

export interface RoleUpdateDataInput {
  name?: String | null;
}

export interface RoleUpdateInput {
  name?: String | null;
}

export interface RoleUpdateManyDataInput {
  name?: String | null;
}

export interface RoleUpdateManyInput {
  create?: RoleCreateInput[] | RoleCreateInput | null;
  connect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput | null;
  set?: RoleWhereUniqueInput[] | RoleWhereUniqueInput | null;
  disconnect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput | null;
  delete?: RoleWhereUniqueInput[] | RoleWhereUniqueInput | null;
  update?:
    | RoleUpdateWithWhereUniqueNestedInput[]
    | RoleUpdateWithWhereUniqueNestedInput
    | null;
  updateMany?:
    | RoleUpdateManyWithWhereNestedInput[]
    | RoleUpdateManyWithWhereNestedInput
    | null;
  deleteMany?: RoleScalarWhereInput[] | RoleScalarWhereInput | null;
  upsert?:
    | RoleUpsertWithWhereUniqueNestedInput[]
    | RoleUpsertWithWhereUniqueNestedInput
    | null;
}

export interface RoleUpdateManyMutationInput {
  name?: String | null;
}

export interface RoleUpdateManyWithWhereNestedInput {
  where: RoleScalarWhereInput;
  data: RoleUpdateManyDataInput;
}

export interface RoleUpdateWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput;
  data: RoleUpdateDataInput;
}

export interface RoleUpsertWithWhereUniqueNestedInput {
  where: RoleWhereUniqueInput;
  update: RoleUpdateDataInput;
  create: RoleCreateInput;
}

export interface RoleWhereInput {
  AND?: RoleWhereInput[] | RoleWhereInput | null;
  OR?: RoleWhereInput[] | RoleWhereInput | null;
  NOT?: RoleWhereInput[] | RoleWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
}

export interface RoleWhereUniqueInput {
  id?: ID_Input | null;
  name?: String | null;
}

export interface TransactionCategoryCreateInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryCreateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialCreateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
  transactions?: TransactionCreateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryCreateManyWithoutOwnerInput {
  create?:
    | TransactionCategoryCreateWithoutOwnerInput[]
    | TransactionCategoryCreateWithoutOwnerInput
    | null;
  connect?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
}

export interface TransactionCategoryCreateManyWithoutParentCategoryInput {
  create?:
    | TransactionCategoryCreateWithoutParentCategoryInput[]
    | TransactionCategoryCreateWithoutParentCategoryInput
    | null;
  connect?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
}

export interface TransactionCategoryCreateOneWithoutChildCategoriesInput {
  create?: TransactionCategoryCreateWithoutChildCategoriesInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
}

export interface TransactionCategoryCreateOneWithoutDistributingMetricItemsInput {
  create?: TransactionCategoryCreateWithoutDistributingMetricItemsInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
}

export interface TransactionCategoryCreateOneWithoutTransactionsInput {
  create?: TransactionCategoryCreateWithoutTransactionsInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
}

export interface TransactionCategoryCreateWithoutChildCategoriesInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryCreateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialCreateOneWithoutTransactionCategoriesInput | null;
  transactions?: TransactionCreateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryCreateWithoutDistributingMetricItemsInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryCreateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialCreateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
  transactions?: TransactionCreateManyWithoutTransactionCategoryInput | null;
}

export interface TransactionCategoryCreateWithoutOwnerInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryCreateOneWithoutChildCategoriesInput | null;
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
  transactions?: TransactionCreateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryCreateWithoutParentCategoryInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  owner?: UserCredentialCreateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
  transactions?: TransactionCreateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryCreateWithoutTransactionsInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryCreateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialCreateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryScalarWhereInput {
  AND?:
    | TransactionCategoryScalarWhereInput[]
    | TransactionCategoryScalarWhereInput
    | null;
  OR?:
    | TransactionCategoryScalarWhereInput[]
    | TransactionCategoryScalarWhereInput
    | null;
  NOT?:
    | TransactionCategoryScalarWhereInput[]
    | TransactionCategoryScalarWhereInput
    | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
  isSystem?: Boolean | null;
  isSystem_not?: Boolean | null;
  isOutcome?: Boolean | null;
  isOutcome_not?: Boolean | null;
}

export interface TransactionCategorySubscriptionWhereInput {
  AND?:
    | TransactionCategorySubscriptionWhereInput[]
    | TransactionCategorySubscriptionWhereInput
    | null;
  OR?:
    | TransactionCategorySubscriptionWhereInput[]
    | TransactionCategorySubscriptionWhereInput
    | null;
  NOT?:
    | TransactionCategorySubscriptionWhereInput[]
    | TransactionCategorySubscriptionWhereInput
    | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: TransactionCategoryWhereInput | null;
}

export interface TransactionCategoryUpdateInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryUpdateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialUpdateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
  transactions?: TransactionUpdateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryUpdateManyDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
}

export interface TransactionCategoryUpdateManyMutationInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
}

export interface TransactionCategoryUpdateManyWithoutOwnerInput {
  create?:
    | TransactionCategoryCreateWithoutOwnerInput[]
    | TransactionCategoryCreateWithoutOwnerInput
    | null;
  connect?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  set?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  disconnect?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  delete?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  update?:
    | TransactionCategoryUpdateWithWhereUniqueWithoutOwnerInput[]
    | TransactionCategoryUpdateWithWhereUniqueWithoutOwnerInput
    | null;
  updateMany?:
    | TransactionCategoryUpdateManyWithWhereNestedInput[]
    | TransactionCategoryUpdateManyWithWhereNestedInput
    | null;
  deleteMany?:
    | TransactionCategoryScalarWhereInput[]
    | TransactionCategoryScalarWhereInput
    | null;
  upsert?:
    | TransactionCategoryUpsertWithWhereUniqueWithoutOwnerInput[]
    | TransactionCategoryUpsertWithWhereUniqueWithoutOwnerInput
    | null;
}

export interface TransactionCategoryUpdateManyWithoutParentCategoryInput {
  create?:
    | TransactionCategoryCreateWithoutParentCategoryInput[]
    | TransactionCategoryCreateWithoutParentCategoryInput
    | null;
  connect?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  set?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  disconnect?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  delete?:
    | TransactionCategoryWhereUniqueInput[]
    | TransactionCategoryWhereUniqueInput
    | null;
  update?:
    | TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput[]
    | TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput
    | null;
  updateMany?:
    | TransactionCategoryUpdateManyWithWhereNestedInput[]
    | TransactionCategoryUpdateManyWithWhereNestedInput
    | null;
  deleteMany?:
    | TransactionCategoryScalarWhereInput[]
    | TransactionCategoryScalarWhereInput
    | null;
  upsert?:
    | TransactionCategoryUpsertWithWhereUniqueWithoutParentCategoryInput[]
    | TransactionCategoryUpsertWithWhereUniqueWithoutParentCategoryInput
    | null;
}

export interface TransactionCategoryUpdateManyWithWhereNestedInput {
  where: TransactionCategoryScalarWhereInput;
  data: TransactionCategoryUpdateManyDataInput;
}

export interface TransactionCategoryUpdateOneRequiredWithoutTransactionsInput {
  create?: TransactionCategoryCreateWithoutTransactionsInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
  update?: TransactionCategoryUpdateWithoutTransactionsDataInput | null;
  upsert?: TransactionCategoryUpsertWithoutTransactionsInput | null;
}

export interface TransactionCategoryUpdateOneWithoutChildCategoriesInput {
  create?: TransactionCategoryCreateWithoutChildCategoriesInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
  disconnect?: Boolean | null;
  delete?: Boolean | null;
  update?: TransactionCategoryUpdateWithoutChildCategoriesDataInput | null;
  upsert?: TransactionCategoryUpsertWithoutChildCategoriesInput | null;
}

export interface TransactionCategoryUpdateOneWithoutDistributingMetricItemsInput {
  create?: TransactionCategoryCreateWithoutDistributingMetricItemsInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
  disconnect?: Boolean | null;
  delete?: Boolean | null;
  update?: TransactionCategoryUpdateWithoutDistributingMetricItemsDataInput | null;
  upsert?: TransactionCategoryUpsertWithoutDistributingMetricItemsInput | null;
}

export interface TransactionCategoryUpdateWithoutChildCategoriesDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryUpdateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialUpdateOneWithoutTransactionCategoriesInput | null;
  transactions?: TransactionUpdateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryUpdateWithoutDistributingMetricItemsDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryUpdateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialUpdateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
  transactions?: TransactionUpdateManyWithoutTransactionCategoryInput | null;
}

export interface TransactionCategoryUpdateWithoutOwnerDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryUpdateOneWithoutChildCategoriesInput | null;
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
  transactions?: TransactionUpdateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryUpdateWithoutParentCategoryDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  owner?: UserCredentialUpdateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
  transactions?: TransactionUpdateManyWithoutTransactionCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryUpdateWithoutTransactionsDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryUpdateOneWithoutChildCategoriesInput | null;
  owner?: UserCredentialUpdateOneWithoutTransactionCategoriesInput | null;
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutCategoryInput | null;
}

export interface TransactionCategoryUpdateWithWhereUniqueWithoutOwnerInput {
  where: TransactionCategoryWhereUniqueInput;
  data: TransactionCategoryUpdateWithoutOwnerDataInput;
}

export interface TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput {
  where: TransactionCategoryWhereUniqueInput;
  data: TransactionCategoryUpdateWithoutParentCategoryDataInput;
}

export interface TransactionCategoryUpsertWithoutChildCategoriesInput {
  update: TransactionCategoryUpdateWithoutChildCategoriesDataInput;
  create: TransactionCategoryCreateWithoutChildCategoriesInput;
}

export interface TransactionCategoryUpsertWithoutDistributingMetricItemsInput {
  update: TransactionCategoryUpdateWithoutDistributingMetricItemsDataInput;
  create: TransactionCategoryCreateWithoutDistributingMetricItemsInput;
}

export interface TransactionCategoryUpsertWithoutTransactionsInput {
  update: TransactionCategoryUpdateWithoutTransactionsDataInput;
  create: TransactionCategoryCreateWithoutTransactionsInput;
}

export interface TransactionCategoryUpsertWithWhereUniqueWithoutOwnerInput {
  where: TransactionCategoryWhereUniqueInput;
  update: TransactionCategoryUpdateWithoutOwnerDataInput;
  create: TransactionCategoryCreateWithoutOwnerInput;
}

export interface TransactionCategoryUpsertWithWhereUniqueWithoutParentCategoryInput {
  where: TransactionCategoryWhereUniqueInput;
  update: TransactionCategoryUpdateWithoutParentCategoryDataInput;
  create: TransactionCategoryCreateWithoutParentCategoryInput;
}

export interface TransactionCategoryWhereInput {
  AND?: TransactionCategoryWhereInput[] | TransactionCategoryWhereInput | null;
  OR?: TransactionCategoryWhereInput[] | TransactionCategoryWhereInput | null;
  NOT?: TransactionCategoryWhereInput[] | TransactionCategoryWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  name?: String | null;
  name_not?: String | null;
  name_in?: String[] | String | null;
  name_not_in?: String[] | String | null;
  name_lt?: String | null;
  name_lte?: String | null;
  name_gt?: String | null;
  name_gte?: String | null;
  name_contains?: String | null;
  name_not_contains?: String | null;
  name_starts_with?: String | null;
  name_not_starts_with?: String | null;
  name_ends_with?: String | null;
  name_not_ends_with?: String | null;
  isSystem?: Boolean | null;
  isSystem_not?: Boolean | null;
  isOutcome?: Boolean | null;
  isOutcome_not?: Boolean | null;
  parentCategory?: TransactionCategoryWhereInput | null;
  owner?: UserCredentialWhereInput | null;
  childCategories_every?: TransactionCategoryWhereInput | null;
  childCategories_some?: TransactionCategoryWhereInput | null;
  childCategories_none?: TransactionCategoryWhereInput | null;
  transactions_every?: TransactionWhereInput | null;
  transactions_some?: TransactionWhereInput | null;
  transactions_none?: TransactionWhereInput | null;
  distributingMetricItems_every?: DistributingMetricItemWhereInput | null;
  distributingMetricItems_some?: DistributingMetricItemWhereInput | null;
  distributingMetricItems_none?: DistributingMetricItemWhereInput | null;
}

export interface TransactionCategoryWhereUniqueInput {
  id?: ID_Input | null;
}

export interface TransactionCreateInput {
  id?: ID_Input | null;
  datetime: DateTime;
  description?: String | null;
  amount: Int;
  owner: UserCredentialCreateOneWithoutTransactionsInput;
  transactionCategory: TransactionCategoryCreateOneWithoutTransactionsInput;
  currency: CurrencyCreateOneWithoutTransactionsInput;
}

export interface TransactionCreateManyWithoutCurrencyInput {
  create?:
    | TransactionCreateWithoutCurrencyInput[]
    | TransactionCreateWithoutCurrencyInput
    | null;
  connect?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
}

export interface TransactionCreateManyWithoutOwnerInput {
  create?:
    | TransactionCreateWithoutOwnerInput[]
    | TransactionCreateWithoutOwnerInput
    | null;
  connect?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
}

export interface TransactionCreateManyWithoutTransactionCategoryInput {
  create?:
    | TransactionCreateWithoutTransactionCategoryInput[]
    | TransactionCreateWithoutTransactionCategoryInput
    | null;
  connect?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
}

export interface TransactionCreateWithoutCurrencyInput {
  id?: ID_Input | null;
  datetime: DateTime;
  description?: String | null;
  amount: Int;
  owner: UserCredentialCreateOneWithoutTransactionsInput;
  transactionCategory: TransactionCategoryCreateOneWithoutTransactionsInput;
}

export interface TransactionCreateWithoutOwnerInput {
  id?: ID_Input | null;
  datetime: DateTime;
  description?: String | null;
  amount: Int;
  transactionCategory: TransactionCategoryCreateOneWithoutTransactionsInput;
  currency: CurrencyCreateOneWithoutTransactionsInput;
}

export interface TransactionCreateWithoutTransactionCategoryInput {
  id?: ID_Input | null;
  datetime: DateTime;
  description?: String | null;
  amount: Int;
  owner: UserCredentialCreateOneWithoutTransactionsInput;
  currency: CurrencyCreateOneWithoutTransactionsInput;
}

export interface TransactionScalarWhereInput {
  AND?: TransactionScalarWhereInput[] | TransactionScalarWhereInput | null;
  OR?: TransactionScalarWhereInput[] | TransactionScalarWhereInput | null;
  NOT?: TransactionScalarWhereInput[] | TransactionScalarWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  datetime?: DateTime | null;
  datetime_not?: DateTime | null;
  datetime_in?: DateTime[] | DateTime | null;
  datetime_not_in?: DateTime[] | DateTime | null;
  datetime_lt?: DateTime | null;
  datetime_lte?: DateTime | null;
  datetime_gt?: DateTime | null;
  datetime_gte?: DateTime | null;
  description?: String | null;
  description_not?: String | null;
  description_in?: String[] | String | null;
  description_not_in?: String[] | String | null;
  description_lt?: String | null;
  description_lte?: String | null;
  description_gt?: String | null;
  description_gte?: String | null;
  description_contains?: String | null;
  description_not_contains?: String | null;
  description_starts_with?: String | null;
  description_not_starts_with?: String | null;
  description_ends_with?: String | null;
  description_not_ends_with?: String | null;
  amount?: Int | null;
  amount_not?: Int | null;
  amount_in?: Int[] | Int | null;
  amount_not_in?: Int[] | Int | null;
  amount_lt?: Int | null;
  amount_lte?: Int | null;
  amount_gt?: Int | null;
  amount_gte?: Int | null;
}

export interface TransactionSubscriptionWhereInput {
  AND?:
    | TransactionSubscriptionWhereInput[]
    | TransactionSubscriptionWhereInput
    | null;
  OR?:
    | TransactionSubscriptionWhereInput[]
    | TransactionSubscriptionWhereInput
    | null;
  NOT?:
    | TransactionSubscriptionWhereInput[]
    | TransactionSubscriptionWhereInput
    | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: TransactionWhereInput | null;
}

export interface TransactionUpdateInput {
  datetime?: DateTime | null;
  description?: String | null;
  amount?: Int | null;
  owner?: UserCredentialUpdateOneRequiredWithoutTransactionsInput | null;
  transactionCategory?: TransactionCategoryUpdateOneRequiredWithoutTransactionsInput | null;
  currency?: CurrencyUpdateOneRequiredWithoutTransactionsInput | null;
}

export interface TransactionUpdateManyDataInput {
  datetime?: DateTime | null;
  description?: String | null;
  amount?: Int | null;
}

export interface TransactionUpdateManyMutationInput {
  datetime?: DateTime | null;
  description?: String | null;
  amount?: Int | null;
}

export interface TransactionUpdateManyWithoutCurrencyInput {
  create?:
    | TransactionCreateWithoutCurrencyInput[]
    | TransactionCreateWithoutCurrencyInput
    | null;
  connect?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  set?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  disconnect?:
    | TransactionWhereUniqueInput[]
    | TransactionWhereUniqueInput
    | null;
  delete?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  update?:
    | TransactionUpdateWithWhereUniqueWithoutCurrencyInput[]
    | TransactionUpdateWithWhereUniqueWithoutCurrencyInput
    | null;
  updateMany?:
    | TransactionUpdateManyWithWhereNestedInput[]
    | TransactionUpdateManyWithWhereNestedInput
    | null;
  deleteMany?:
    | TransactionScalarWhereInput[]
    | TransactionScalarWhereInput
    | null;
  upsert?:
    | TransactionUpsertWithWhereUniqueWithoutCurrencyInput[]
    | TransactionUpsertWithWhereUniqueWithoutCurrencyInput
    | null;
}

export interface TransactionUpdateManyWithoutOwnerInput {
  create?:
    | TransactionCreateWithoutOwnerInput[]
    | TransactionCreateWithoutOwnerInput
    | null;
  connect?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  set?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  disconnect?:
    | TransactionWhereUniqueInput[]
    | TransactionWhereUniqueInput
    | null;
  delete?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  update?:
    | TransactionUpdateWithWhereUniqueWithoutOwnerInput[]
    | TransactionUpdateWithWhereUniqueWithoutOwnerInput
    | null;
  updateMany?:
    | TransactionUpdateManyWithWhereNestedInput[]
    | TransactionUpdateManyWithWhereNestedInput
    | null;
  deleteMany?:
    | TransactionScalarWhereInput[]
    | TransactionScalarWhereInput
    | null;
  upsert?:
    | TransactionUpsertWithWhereUniqueWithoutOwnerInput[]
    | TransactionUpsertWithWhereUniqueWithoutOwnerInput
    | null;
}

export interface TransactionUpdateManyWithoutTransactionCategoryInput {
  create?:
    | TransactionCreateWithoutTransactionCategoryInput[]
    | TransactionCreateWithoutTransactionCategoryInput
    | null;
  connect?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  set?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  disconnect?:
    | TransactionWhereUniqueInput[]
    | TransactionWhereUniqueInput
    | null;
  delete?: TransactionWhereUniqueInput[] | TransactionWhereUniqueInput | null;
  update?:
    | TransactionUpdateWithWhereUniqueWithoutTransactionCategoryInput[]
    | TransactionUpdateWithWhereUniqueWithoutTransactionCategoryInput
    | null;
  updateMany?:
    | TransactionUpdateManyWithWhereNestedInput[]
    | TransactionUpdateManyWithWhereNestedInput
    | null;
  deleteMany?:
    | TransactionScalarWhereInput[]
    | TransactionScalarWhereInput
    | null;
  upsert?:
    | TransactionUpsertWithWhereUniqueWithoutTransactionCategoryInput[]
    | TransactionUpsertWithWhereUniqueWithoutTransactionCategoryInput
    | null;
}

export interface TransactionUpdateManyWithWhereNestedInput {
  where: TransactionScalarWhereInput;
  data: TransactionUpdateManyDataInput;
}

export interface TransactionUpdateWithoutCurrencyDataInput {
  datetime?: DateTime | null;
  description?: String | null;
  amount?: Int | null;
  owner?: UserCredentialUpdateOneRequiredWithoutTransactionsInput | null;
  transactionCategory?: TransactionCategoryUpdateOneRequiredWithoutTransactionsInput | null;
}

export interface TransactionUpdateWithoutOwnerDataInput {
  datetime?: DateTime | null;
  description?: String | null;
  amount?: Int | null;
  transactionCategory?: TransactionCategoryUpdateOneRequiredWithoutTransactionsInput | null;
  currency?: CurrencyUpdateOneRequiredWithoutTransactionsInput | null;
}

export interface TransactionUpdateWithoutTransactionCategoryDataInput {
  datetime?: DateTime | null;
  description?: String | null;
  amount?: Int | null;
  owner?: UserCredentialUpdateOneRequiredWithoutTransactionsInput | null;
  currency?: CurrencyUpdateOneRequiredWithoutTransactionsInput | null;
}

export interface TransactionUpdateWithWhereUniqueWithoutCurrencyInput {
  where: TransactionWhereUniqueInput;
  data: TransactionUpdateWithoutCurrencyDataInput;
}

export interface TransactionUpdateWithWhereUniqueWithoutOwnerInput {
  where: TransactionWhereUniqueInput;
  data: TransactionUpdateWithoutOwnerDataInput;
}

export interface TransactionUpdateWithWhereUniqueWithoutTransactionCategoryInput {
  where: TransactionWhereUniqueInput;
  data: TransactionUpdateWithoutTransactionCategoryDataInput;
}

export interface TransactionUpsertWithWhereUniqueWithoutCurrencyInput {
  where: TransactionWhereUniqueInput;
  update: TransactionUpdateWithoutCurrencyDataInput;
  create: TransactionCreateWithoutCurrencyInput;
}

export interface TransactionUpsertWithWhereUniqueWithoutOwnerInput {
  where: TransactionWhereUniqueInput;
  update: TransactionUpdateWithoutOwnerDataInput;
  create: TransactionCreateWithoutOwnerInput;
}

export interface TransactionUpsertWithWhereUniqueWithoutTransactionCategoryInput {
  where: TransactionWhereUniqueInput;
  update: TransactionUpdateWithoutTransactionCategoryDataInput;
  create: TransactionCreateWithoutTransactionCategoryInput;
}

export interface TransactionWhereInput {
  AND?: TransactionWhereInput[] | TransactionWhereInput | null;
  OR?: TransactionWhereInput[] | TransactionWhereInput | null;
  NOT?: TransactionWhereInput[] | TransactionWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  datetime?: DateTime | null;
  datetime_not?: DateTime | null;
  datetime_in?: DateTime[] | DateTime | null;
  datetime_not_in?: DateTime[] | DateTime | null;
  datetime_lt?: DateTime | null;
  datetime_lte?: DateTime | null;
  datetime_gt?: DateTime | null;
  datetime_gte?: DateTime | null;
  description?: String | null;
  description_not?: String | null;
  description_in?: String[] | String | null;
  description_not_in?: String[] | String | null;
  description_lt?: String | null;
  description_lte?: String | null;
  description_gt?: String | null;
  description_gte?: String | null;
  description_contains?: String | null;
  description_not_contains?: String | null;
  description_starts_with?: String | null;
  description_not_starts_with?: String | null;
  description_ends_with?: String | null;
  description_not_ends_with?: String | null;
  amount?: Int | null;
  amount_not?: Int | null;
  amount_in?: Int[] | Int | null;
  amount_not_in?: Int[] | Int | null;
  amount_lt?: Int | null;
  amount_lte?: Int | null;
  amount_gt?: Int | null;
  amount_gte?: Int | null;
  owner?: UserCredentialWhereInput | null;
  transactionCategory?: TransactionCategoryWhereInput | null;
  currency?: CurrencyWhereInput | null;
}

export interface TransactionWhereUniqueInput {
  id?: ID_Input | null;
}

export interface UserCredentialCreateInput {
  id?: ID_Input | null;
  email: String;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleCreateManyInput | null;
  transactionCategories?: TransactionCategoryCreateManyWithoutOwnerInput | null;
  transactions?: TransactionCreateManyWithoutOwnerInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutUserInput | null;
}

export interface UserCredentialCreateOneWithoutDistributingMetricItemsInput {
  create?: UserCredentialCreateWithoutDistributingMetricItemsInput | null;
  connect?: UserCredentialWhereUniqueInput | null;
}

export interface UserCredentialCreateOneWithoutTransactionCategoriesInput {
  create?: UserCredentialCreateWithoutTransactionCategoriesInput | null;
  connect?: UserCredentialWhereUniqueInput | null;
}

export interface UserCredentialCreateOneWithoutTransactionsInput {
  create?: UserCredentialCreateWithoutTransactionsInput | null;
  connect?: UserCredentialWhereUniqueInput | null;
}

export interface UserCredentialCreateWithoutDistributingMetricItemsInput {
  id?: ID_Input | null;
  email: String;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleCreateManyInput | null;
  transactionCategories?: TransactionCategoryCreateManyWithoutOwnerInput | null;
  transactions?: TransactionCreateManyWithoutOwnerInput | null;
}

export interface UserCredentialCreateWithoutTransactionCategoriesInput {
  id?: ID_Input | null;
  email: String;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleCreateManyInput | null;
  transactions?: TransactionCreateManyWithoutOwnerInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutUserInput | null;
}

export interface UserCredentialCreateWithoutTransactionsInput {
  id?: ID_Input | null;
  email: String;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleCreateManyInput | null;
  transactionCategories?: TransactionCategoryCreateManyWithoutOwnerInput | null;
  distributingMetricItems?: DistributingMetricItemCreateManyWithoutUserInput | null;
}

export interface UserCredentialSubscriptionWhereInput {
  AND?:
    | UserCredentialSubscriptionWhereInput[]
    | UserCredentialSubscriptionWhereInput
    | null;
  OR?:
    | UserCredentialSubscriptionWhereInput[]
    | UserCredentialSubscriptionWhereInput
    | null;
  NOT?:
    | UserCredentialSubscriptionWhereInput[]
    | UserCredentialSubscriptionWhereInput
    | null;
  mutation_in?: MutationType[] | MutationType | null;
  updatedFields_contains?: String | null;
  updatedFields_contains_every?: String[] | String | null;
  updatedFields_contains_some?: String[] | String | null;
  node?: UserCredentialWhereInput | null;
}

export interface UserCredentialUpdateInput {
  email?: String | null;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleUpdateManyInput | null;
  transactionCategories?: TransactionCategoryUpdateManyWithoutOwnerInput | null;
  transactions?: TransactionUpdateManyWithoutOwnerInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutUserInput | null;
}

export interface UserCredentialUpdateManyMutationInput {
  email?: String | null;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
}

export interface UserCredentialUpdateOneRequiredWithoutDistributingMetricItemsInput {
  create?: UserCredentialCreateWithoutDistributingMetricItemsInput | null;
  connect?: UserCredentialWhereUniqueInput | null;
  update?: UserCredentialUpdateWithoutDistributingMetricItemsDataInput | null;
  upsert?: UserCredentialUpsertWithoutDistributingMetricItemsInput | null;
}

export interface UserCredentialUpdateOneRequiredWithoutTransactionsInput {
  create?: UserCredentialCreateWithoutTransactionsInput | null;
  connect?: UserCredentialWhereUniqueInput | null;
  update?: UserCredentialUpdateWithoutTransactionsDataInput | null;
  upsert?: UserCredentialUpsertWithoutTransactionsInput | null;
}

export interface UserCredentialUpdateOneWithoutTransactionCategoriesInput {
  create?: UserCredentialCreateWithoutTransactionCategoriesInput | null;
  connect?: UserCredentialWhereUniqueInput | null;
  disconnect?: Boolean | null;
  delete?: Boolean | null;
  update?: UserCredentialUpdateWithoutTransactionCategoriesDataInput | null;
  upsert?: UserCredentialUpsertWithoutTransactionCategoriesInput | null;
}

export interface UserCredentialUpdateWithoutDistributingMetricItemsDataInput {
  email?: String | null;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleUpdateManyInput | null;
  transactionCategories?: TransactionCategoryUpdateManyWithoutOwnerInput | null;
  transactions?: TransactionUpdateManyWithoutOwnerInput | null;
}

export interface UserCredentialUpdateWithoutTransactionCategoriesDataInput {
  email?: String | null;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleUpdateManyInput | null;
  transactions?: TransactionUpdateManyWithoutOwnerInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutUserInput | null;
}

export interface UserCredentialUpdateWithoutTransactionsDataInput {
  email?: String | null;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleUpdateManyInput | null;
  transactionCategories?: TransactionCategoryUpdateManyWithoutOwnerInput | null;
  distributingMetricItems?: DistributingMetricItemUpdateManyWithoutUserInput | null;
}

export interface UserCredentialUpsertWithoutDistributingMetricItemsInput {
  update: UserCredentialUpdateWithoutDistributingMetricItemsDataInput;
  create: UserCredentialCreateWithoutDistributingMetricItemsInput;
}

export interface UserCredentialUpsertWithoutTransactionCategoriesInput {
  update: UserCredentialUpdateWithoutTransactionCategoriesDataInput;
  create: UserCredentialCreateWithoutTransactionCategoriesInput;
}

export interface UserCredentialUpsertWithoutTransactionsInput {
  update: UserCredentialUpdateWithoutTransactionsDataInput;
  create: UserCredentialCreateWithoutTransactionsInput;
}

export interface UserCredentialWhereInput {
  AND?: UserCredentialWhereInput[] | UserCredentialWhereInput | null;
  OR?: UserCredentialWhereInput[] | UserCredentialWhereInput | null;
  NOT?: UserCredentialWhereInput[] | UserCredentialWhereInput | null;
  id?: ID_Input | null;
  id_not?: ID_Input | null;
  id_in?: ID_Output[] | ID_Output | null;
  id_not_in?: ID_Output[] | ID_Output | null;
  id_lt?: ID_Input | null;
  id_lte?: ID_Input | null;
  id_gt?: ID_Input | null;
  id_gte?: ID_Input | null;
  id_contains?: ID_Input | null;
  id_not_contains?: ID_Input | null;
  id_starts_with?: ID_Input | null;
  id_not_starts_with?: ID_Input | null;
  id_ends_with?: ID_Input | null;
  id_not_ends_with?: ID_Input | null;
  email?: String | null;
  email_not?: String | null;
  email_in?: String[] | String | null;
  email_not_in?: String[] | String | null;
  email_lt?: String | null;
  email_lte?: String | null;
  email_gt?: String | null;
  email_gte?: String | null;
  email_contains?: String | null;
  email_not_contains?: String | null;
  email_starts_with?: String | null;
  email_not_starts_with?: String | null;
  email_ends_with?: String | null;
  email_not_ends_with?: String | null;
  profileImageUrl?: String | null;
  profileImageUrl_not?: String | null;
  profileImageUrl_in?: String[] | String | null;
  profileImageUrl_not_in?: String[] | String | null;
  profileImageUrl_lt?: String | null;
  profileImageUrl_lte?: String | null;
  profileImageUrl_gt?: String | null;
  profileImageUrl_gte?: String | null;
  profileImageUrl_contains?: String | null;
  profileImageUrl_not_contains?: String | null;
  profileImageUrl_starts_with?: String | null;
  profileImageUrl_not_starts_with?: String | null;
  profileImageUrl_ends_with?: String | null;
  profileImageUrl_not_ends_with?: String | null;
  isActive?: Boolean | null;
  isActive_not?: Boolean | null;
  roles_every?: RoleWhereInput | null;
  roles_some?: RoleWhereInput | null;
  roles_none?: RoleWhereInput | null;
  transactionCategories_every?: TransactionCategoryWhereInput | null;
  transactionCategories_some?: TransactionCategoryWhereInput | null;
  transactionCategories_none?: TransactionCategoryWhereInput | null;
  transactions_every?: TransactionWhereInput | null;
  transactions_some?: TransactionWhereInput | null;
  transactions_none?: TransactionWhereInput | null;
  distributingMetricItems_every?: DistributingMetricItemWhereInput | null;
  distributingMetricItems_some?: DistributingMetricItemWhereInput | null;
  distributingMetricItems_none?: DistributingMetricItemWhereInput | null;
}

export interface UserCredentialWhereUniqueInput {
  id?: ID_Input | null;
  email?: String | null;
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output;
}

export interface AggregateAnalyticMetric {
  count: Int;
}

export interface AggregateCurrency {
  count: Int;
}

export interface AggregateDistributingMetricItem {
  count: Int;
}

export interface AggregatePeriod {
  count: Int;
}

export interface AggregateRole {
  count: Int;
}

export interface AggregateTransaction {
  count: Int;
}

export interface AggregateTransactionCategory {
  count: Int;
}

export interface AggregateUserCredential {
  count: Int;
}

export interface AnalyticMetric extends Node {
  id: ID_Output;
  name: String;
}

/*
 * A connection to a list of items.

 */
export interface AnalyticMetricConnection {
  pageInfo: PageInfo;
  edges: Array<AnalyticMetricEdge | null>;
  aggregate: AggregateAnalyticMetric;
}

/*
 * An edge in a connection.

 */
export interface AnalyticMetricEdge {
  node: AnalyticMetric;
  cursor: String;
}

export interface AnalyticMetricPreviousValues {
  id: ID_Output;
  name: String;
}

export interface AnalyticMetricSubscriptionPayload {
  mutation: MutationType;
  node?: AnalyticMetric | null;
  updatedFields?: Array<String> | null;
  previousValues?: AnalyticMetricPreviousValues | null;
}

export interface BatchPayload {
  count: Long;
}

export interface Currency extends Node {
  id: ID_Output;
  name: String;
  code: String;
  distributingMetricItems?: Array<DistributingMetricItem> | null;
  transactions?: Array<Transaction> | null;
}

/*
 * A connection to a list of items.

 */
export interface CurrencyConnection {
  pageInfo: PageInfo;
  edges: Array<CurrencyEdge | null>;
  aggregate: AggregateCurrency;
}

/*
 * An edge in a connection.

 */
export interface CurrencyEdge {
  node: Currency;
  cursor: String;
}

export interface CurrencyPreviousValues {
  id: ID_Output;
  name: String;
  code: String;
}

export interface CurrencySubscriptionPayload {
  mutation: MutationType;
  node?: Currency | null;
  updatedFields?: Array<String> | null;
  previousValues?: CurrencyPreviousValues | null;
}

export interface DistributingMetricItem extends Node {
  id: ID_Output;
  user: UserCredential;
  period: Period;
  metric: AnalyticMetric;
  category?: TransactionCategory | null;
  baseCurrency?: Currency | null;
}

/*
 * A connection to a list of items.

 */
export interface DistributingMetricItemConnection {
  pageInfo: PageInfo;
  edges: Array<DistributingMetricItemEdge | null>;
  aggregate: AggregateDistributingMetricItem;
}

/*
 * An edge in a connection.

 */
export interface DistributingMetricItemEdge {
  node: DistributingMetricItem;
  cursor: String;
}

export interface DistributingMetricItemPreviousValues {
  id: ID_Output;
}

export interface DistributingMetricItemSubscriptionPayload {
  mutation: MutationType;
  node?: DistributingMetricItem | null;
  updatedFields?: Array<String> | null;
  previousValues?: DistributingMetricItemPreviousValues | null;
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String | null;
  endCursor?: String | null;
}

export interface Period extends Node {
  id: ID_Output;
  name: String;
}

/*
 * A connection to a list of items.

 */
export interface PeriodConnection {
  pageInfo: PageInfo;
  edges: Array<PeriodEdge | null>;
  aggregate: AggregatePeriod;
}

/*
 * An edge in a connection.

 */
export interface PeriodEdge {
  node: Period;
  cursor: String;
}

export interface PeriodPreviousValues {
  id: ID_Output;
  name: String;
}

export interface PeriodSubscriptionPayload {
  mutation: MutationType;
  node?: Period | null;
  updatedFields?: Array<String> | null;
  previousValues?: PeriodPreviousValues | null;
}

export interface Role extends Node {
  id: ID_Output;
  name: String;
}

/*
 * A connection to a list of items.

 */
export interface RoleConnection {
  pageInfo: PageInfo;
  edges: Array<RoleEdge | null>;
  aggregate: AggregateRole;
}

/*
 * An edge in a connection.

 */
export interface RoleEdge {
  node: Role;
  cursor: String;
}

export interface RolePreviousValues {
  id: ID_Output;
  name: String;
}

export interface RoleSubscriptionPayload {
  mutation: MutationType;
  node?: Role | null;
  updatedFields?: Array<String> | null;
  previousValues?: RolePreviousValues | null;
}

export interface Transaction extends Node {
  id: ID_Output;
  datetime: DateTime;
  description?: String | null;
  amount: Int;
  owner: UserCredential;
  transactionCategory: TransactionCategory;
  currency: Currency;
}

export interface TransactionCategory extends Node {
  id: ID_Output;
  name: String;
  parentCategory?: TransactionCategory | null;
  owner?: UserCredential | null;
  isSystem: Boolean;
  isOutcome: Boolean;
  childCategories?: Array<TransactionCategory> | null;
  transactions?: Array<Transaction> | null;
  distributingMetricItems?: Array<DistributingMetricItem> | null;
}

/*
 * A connection to a list of items.

 */
export interface TransactionCategoryConnection {
  pageInfo: PageInfo;
  edges: Array<TransactionCategoryEdge | null>;
  aggregate: AggregateTransactionCategory;
}

/*
 * An edge in a connection.

 */
export interface TransactionCategoryEdge {
  node: TransactionCategory;
  cursor: String;
}

export interface TransactionCategoryPreviousValues {
  id: ID_Output;
  name: String;
  isSystem: Boolean;
  isOutcome: Boolean;
}

export interface TransactionCategorySubscriptionPayload {
  mutation: MutationType;
  node?: TransactionCategory | null;
  updatedFields?: Array<String> | null;
  previousValues?: TransactionCategoryPreviousValues | null;
}

/*
 * A connection to a list of items.

 */
export interface TransactionConnection {
  pageInfo: PageInfo;
  edges: Array<TransactionEdge | null>;
  aggregate: AggregateTransaction;
}

/*
 * An edge in a connection.

 */
export interface TransactionEdge {
  node: Transaction;
  cursor: String;
}

export interface TransactionPreviousValues {
  id: ID_Output;
  datetime: DateTime;
  description?: String | null;
  amount: Int;
}

export interface TransactionSubscriptionPayload {
  mutation: MutationType;
  node?: Transaction | null;
  updatedFields?: Array<String> | null;
  previousValues?: TransactionPreviousValues | null;
}

export interface UserCredential extends Node {
  id: ID_Output;
  email: String;
  profileImageUrl?: String | null;
  roles?: Array<Role> | null;
  isActive: Boolean;
  transactionCategories?: Array<TransactionCategory> | null;
  transactions?: Array<Transaction> | null;
  distributingMetricItems?: Array<DistributingMetricItem> | null;
}

/*
 * A connection to a list of items.

 */
export interface UserCredentialConnection {
  pageInfo: PageInfo;
  edges: Array<UserCredentialEdge | null>;
  aggregate: AggregateUserCredential;
}

/*
 * An edge in a connection.

 */
export interface UserCredentialEdge {
  node: UserCredential;
  cursor: String;
}

export interface UserCredentialPreviousValues {
  id: ID_Output;
  email: String;
  profileImageUrl?: String | null;
  isActive: Boolean;
}

export interface UserCredentialSubscriptionPayload {
  mutation: MutationType;
  node?: UserCredential | null;
  updatedFields?: Array<String> | null;
  previousValues?: UserCredentialPreviousValues | null;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type DateTime = Date | string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;
