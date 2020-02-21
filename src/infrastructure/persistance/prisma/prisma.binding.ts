import { GraphQLResolveInfo, GraphQLSchema } from 'graphql';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { Options } from 'graphql-binding';
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding';

export interface Query {
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
  role: <T = Role | null>(
    args: { where: RoleWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
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
  node: <T = Node | null>(
    args: { id: ID_Output },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
}

export interface Mutation {
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
  createRole: <T = Role>(
    args: { data: RoleCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
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
  updateRole: <T = Role | null>(
    args: { data: RoleUpdateInput; where: RoleWhereUniqueInput },
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
  deleteRole: <T = Role | null>(
    args: { where: RoleWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T | null>;
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
  upsertRole: <T = Role>(
    args: {
      where: RoleWhereUniqueInput;
      create: RoleCreateInput;
      update: RoleUpdateInput;
    },
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
  updateManyRoles: <T = BatchPayload>(
    args: { data: RoleUpdateManyMutationInput; where?: RoleWhereInput | null },
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
  deleteManyRoles: <T = BatchPayload>(
    args: { where?: RoleWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<T>;
}

export interface Subscription {
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
  role: <T = RoleSubscriptionPayload | null>(
    args: { where?: RoleSubscriptionWhereInput | null },
    info?: GraphQLResolveInfo | string,
    options?: Options,
  ) => Promise<AsyncIterator<T | null>>;
}

export interface Exists {
  AnalyticMetric: (where?: AnalyticMetricWhereInput) => Promise<boolean>;
  Period: (where?: PeriodWhereInput) => Promise<boolean>;
  UserCredential: (where?: UserCredentialWhereInput) => Promise<boolean>;
  Currency: (where?: CurrencyWhereInput) => Promise<boolean>;
  TransactionCategory: (
    where?: TransactionCategoryWhereInput,
  ) => Promise<boolean>;
  Role: (where?: RoleWhereInput) => Promise<boolean>;
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

type AggregatePeriod {
  count: Int!
}

type AggregateRole {
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

input AnalyticMetricUpdateInput {
  name: String
}

input AnalyticMetricUpdateManyMutationInput {
  name: String
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
}

input CurrencyUpdateManyMutationInput {
  name: String
  code: String
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
}

input CurrencyWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createAnalyticMetric(data: AnalyticMetricCreateInput!): AnalyticMetric!
  createPeriod(data: PeriodCreateInput!): Period!
  createUserCredential(data: UserCredentialCreateInput!): UserCredential!
  createCurrency(data: CurrencyCreateInput!): Currency!
  createTransactionCategory(data: TransactionCategoryCreateInput!): TransactionCategory!
  createRole(data: RoleCreateInput!): Role!
  updateAnalyticMetric(data: AnalyticMetricUpdateInput!, where: AnalyticMetricWhereUniqueInput!): AnalyticMetric
  updatePeriod(data: PeriodUpdateInput!, where: PeriodWhereUniqueInput!): Period
  updateUserCredential(data: UserCredentialUpdateInput!, where: UserCredentialWhereUniqueInput!): UserCredential
  updateCurrency(data: CurrencyUpdateInput!, where: CurrencyWhereUniqueInput!): Currency
  updateTransactionCategory(data: TransactionCategoryUpdateInput!, where: TransactionCategoryWhereUniqueInput!): TransactionCategory
  updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
  deleteAnalyticMetric(where: AnalyticMetricWhereUniqueInput!): AnalyticMetric
  deletePeriod(where: PeriodWhereUniqueInput!): Period
  deleteUserCredential(where: UserCredentialWhereUniqueInput!): UserCredential
  deleteCurrency(where: CurrencyWhereUniqueInput!): Currency
  deleteTransactionCategory(where: TransactionCategoryWhereUniqueInput!): TransactionCategory
  deleteRole(where: RoleWhereUniqueInput!): Role
  upsertAnalyticMetric(where: AnalyticMetricWhereUniqueInput!, create: AnalyticMetricCreateInput!, update: AnalyticMetricUpdateInput!): AnalyticMetric!
  upsertPeriod(where: PeriodWhereUniqueInput!, create: PeriodCreateInput!, update: PeriodUpdateInput!): Period!
  upsertUserCredential(where: UserCredentialWhereUniqueInput!, create: UserCredentialCreateInput!, update: UserCredentialUpdateInput!): UserCredential!
  upsertCurrency(where: CurrencyWhereUniqueInput!, create: CurrencyCreateInput!, update: CurrencyUpdateInput!): Currency!
  upsertTransactionCategory(where: TransactionCategoryWhereUniqueInput!, create: TransactionCategoryCreateInput!, update: TransactionCategoryUpdateInput!): TransactionCategory!
  upsertRole(where: RoleWhereUniqueInput!, create: RoleCreateInput!, update: RoleUpdateInput!): Role!
  updateManyAnalyticMetrics(data: AnalyticMetricUpdateManyMutationInput!, where: AnalyticMetricWhereInput): BatchPayload!
  updateManyPeriods(data: PeriodUpdateManyMutationInput!, where: PeriodWhereInput): BatchPayload!
  updateManyUserCredentials(data: UserCredentialUpdateManyMutationInput!, where: UserCredentialWhereInput): BatchPayload!
  updateManyCurrencies(data: CurrencyUpdateManyMutationInput!, where: CurrencyWhereInput): BatchPayload!
  updateManyTransactionCategories(data: TransactionCategoryUpdateManyMutationInput!, where: TransactionCategoryWhereInput): BatchPayload!
  updateManyRoles(data: RoleUpdateManyMutationInput!, where: RoleWhereInput): BatchPayload!
  deleteManyAnalyticMetrics(where: AnalyticMetricWhereInput): BatchPayload!
  deleteManyPeriods(where: PeriodWhereInput): BatchPayload!
  deleteManyUserCredentials(where: UserCredentialWhereInput): BatchPayload!
  deleteManyCurrencies(where: CurrencyWhereInput): BatchPayload!
  deleteManyTransactionCategories(where: TransactionCategoryWhereInput): BatchPayload!
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
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

input PeriodUpdateInput {
  name: String
}

input PeriodUpdateManyMutationInput {
  name: String
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
  analyticMetrics(where: AnalyticMetricWhereInput, orderBy: AnalyticMetricOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AnalyticMetric]!
  periods(where: PeriodWhereInput, orderBy: PeriodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Period]!
  userCredentials(where: UserCredentialWhereInput, orderBy: UserCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserCredential]!
  currencies(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Currency]!
  transactionCategories(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionCategory]!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  analyticMetric(where: AnalyticMetricWhereUniqueInput!): AnalyticMetric
  period(where: PeriodWhereUniqueInput!): Period
  userCredential(where: UserCredentialWhereUniqueInput!): UserCredential
  currency(where: CurrencyWhereUniqueInput!): Currency
  transactionCategory(where: TransactionCategoryWhereUniqueInput!): TransactionCategory
  role(where: RoleWhereUniqueInput!): Role
  analyticMetricsConnection(where: AnalyticMetricWhereInput, orderBy: AnalyticMetricOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnalyticMetricConnection!
  periodsConnection(where: PeriodWhereInput, orderBy: PeriodOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PeriodConnection!
  userCredentialsConnection(where: UserCredentialWhereInput, orderBy: UserCredentialOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserCredentialConnection!
  currenciesConnection(where: CurrencyWhereInput, orderBy: CurrencyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CurrencyConnection!
  transactionCategoriesConnection(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionCategoryConnection!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!

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
  analyticMetric(where: AnalyticMetricSubscriptionWhereInput): AnalyticMetricSubscriptionPayload
  period(where: PeriodSubscriptionWhereInput): PeriodSubscriptionPayload
  userCredential(where: UserCredentialSubscriptionWhereInput): UserCredentialSubscriptionPayload
  currency(where: CurrencySubscriptionWhereInput): CurrencySubscriptionPayload
  transactionCategory(where: TransactionCategorySubscriptionWhereInput): TransactionCategorySubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
}

type TransactionCategory implements Node {
  id: ID!
  name: String!
  parentCategory: TransactionCategory
  isSystem: Boolean!
  isOutcome: Boolean!
  childCategories(where: TransactionCategoryWhereInput, orderBy: TransactionCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TransactionCategory!]
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
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
}

input TransactionCategoryCreateManyWithoutParentCategoryInput {
  create: [TransactionCategoryCreateWithoutParentCategoryInput!]
  connect: [TransactionCategoryWhereUniqueInput!]
}

input TransactionCategoryCreateOneWithoutChildCategoriesInput {
  create: TransactionCategoryCreateWithoutChildCategoriesInput
  connect: TransactionCategoryWhereUniqueInput
}

input TransactionCategoryCreateWithoutChildCategoriesInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryCreateOneWithoutChildCategoriesInput
}

input TransactionCategoryCreateWithoutParentCategoryInput {
  id: ID
  name: String!
  isSystem: Boolean
  isOutcome: Boolean
  childCategories: TransactionCategoryCreateManyWithoutParentCategoryInput
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
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
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

input TransactionCategoryUpdateOneWithoutChildCategoriesInput {
  create: TransactionCategoryCreateWithoutChildCategoriesInput
  connect: TransactionCategoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: TransactionCategoryUpdateWithoutChildCategoriesDataInput
  upsert: TransactionCategoryUpsertWithoutChildCategoriesInput
}

input TransactionCategoryUpdateWithoutChildCategoriesDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  parentCategory: TransactionCategoryUpdateOneWithoutChildCategoriesInput
}

input TransactionCategoryUpdateWithoutParentCategoryDataInput {
  name: String
  isSystem: Boolean
  isOutcome: Boolean
  childCategories: TransactionCategoryUpdateManyWithoutParentCategoryInput
}

input TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput {
  where: TransactionCategoryWhereUniqueInput!
  data: TransactionCategoryUpdateWithoutParentCategoryDataInput!
}

input TransactionCategoryUpsertWithoutChildCategoriesInput {
  update: TransactionCategoryUpdateWithoutChildCategoriesDataInput!
  create: TransactionCategoryCreateWithoutChildCategoriesInput!
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
  childCategories_every: TransactionCategoryWhereInput
  childCategories_some: TransactionCategoryWhereInput
  childCategories_none: TransactionCategoryWhereInput
}

input TransactionCategoryWhereUniqueInput {
  id: ID
}

type UserCredential implements Node {
  id: ID!
  email: String!
  profileImageUrl: String
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role!]
  isActive: Boolean!
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
}

input UserCredentialUpdateManyMutationInput {
  email: String
  profileImageUrl: String
  isActive: Boolean
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

export interface AnalyticMetricUpdateInput {
  name?: String | null;
}

export interface AnalyticMetricUpdateManyMutationInput {
  name?: String | null;
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
}

export interface CurrencyUpdateManyMutationInput {
  name?: String | null;
  code?: String | null;
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
}

export interface CurrencyWhereUniqueInput {
  id?: ID_Input | null;
}

export interface PeriodCreateInput {
  id?: ID_Input | null;
  name: String;
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

export interface PeriodUpdateInput {
  name?: String | null;
}

export interface PeriodUpdateManyMutationInput {
  name?: String | null;
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
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
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

export interface TransactionCategoryCreateWithoutChildCategoriesInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryCreateOneWithoutChildCategoriesInput | null;
}

export interface TransactionCategoryCreateWithoutParentCategoryInput {
  id?: ID_Input | null;
  name: String;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  childCategories?: TransactionCategoryCreateManyWithoutParentCategoryInput | null;
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
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
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

export interface TransactionCategoryUpdateOneWithoutChildCategoriesInput {
  create?: TransactionCategoryCreateWithoutChildCategoriesInput | null;
  connect?: TransactionCategoryWhereUniqueInput | null;
  disconnect?: Boolean | null;
  delete?: Boolean | null;
  update?: TransactionCategoryUpdateWithoutChildCategoriesDataInput | null;
  upsert?: TransactionCategoryUpsertWithoutChildCategoriesInput | null;
}

export interface TransactionCategoryUpdateWithoutChildCategoriesDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  parentCategory?: TransactionCategoryUpdateOneWithoutChildCategoriesInput | null;
}

export interface TransactionCategoryUpdateWithoutParentCategoryDataInput {
  name?: String | null;
  isSystem?: Boolean | null;
  isOutcome?: Boolean | null;
  childCategories?: TransactionCategoryUpdateManyWithoutParentCategoryInput | null;
}

export interface TransactionCategoryUpdateWithWhereUniqueWithoutParentCategoryInput {
  where: TransactionCategoryWhereUniqueInput;
  data: TransactionCategoryUpdateWithoutParentCategoryDataInput;
}

export interface TransactionCategoryUpsertWithoutChildCategoriesInput {
  update: TransactionCategoryUpdateWithoutChildCategoriesDataInput;
  create: TransactionCategoryCreateWithoutChildCategoriesInput;
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
  childCategories_every?: TransactionCategoryWhereInput | null;
  childCategories_some?: TransactionCategoryWhereInput | null;
  childCategories_none?: TransactionCategoryWhereInput | null;
}

export interface TransactionCategoryWhereUniqueInput {
  id?: ID_Input | null;
}

export interface UserCredentialCreateInput {
  id?: ID_Input | null;
  email: String;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
  roles?: RoleCreateManyInput | null;
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
}

export interface UserCredentialUpdateManyMutationInput {
  email?: String | null;
  profileImageUrl?: String | null;
  isActive?: Boolean | null;
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

export interface AggregatePeriod {
  count: Int;
}

export interface AggregateRole {
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

export interface TransactionCategory extends Node {
  id: ID_Output;
  name: String;
  parentCategory?: TransactionCategory | null;
  isSystem: Boolean;
  isOutcome: Boolean;
  childCategories?: Array<TransactionCategory> | null;
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

export interface UserCredential extends Node {
  id: ID_Output;
  email: String;
  profileImageUrl?: String | null;
  roles?: Array<Role> | null;
  isActive: Boolean;
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
