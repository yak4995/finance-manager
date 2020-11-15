CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* users and roles */

CREATE TABLE IF NOT EXISTS public.roles (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR UNIQUE NOT NULL,
  CONSTRAINT "pkey_roles" PRIMARY KEY ("id")
);
ALTER TABLE public.roles OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.user_credentials (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "email" VARCHAR UNIQUE NOT NULL,
  "profileImageUrl" VARCHAR DEFAULT NULL,
  "otp" VARCHAR DEFAULT NULL,
  "lastLoginDate" TIMESTAMP DEFAULT NULL,
  "isActive" BOOLEAN DEFAULT false,
  CONSTRAINT "pkey_users" PRIMARY KEY ("id")
);
ALTER TABLE public.user_credentials OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.users_to_roles (
  "userId" UUID NOT NULL,
  "roleId" UUID NOT NULL,
  PRIMARY KEY ("userId", "roleId"),
  FOREIGN KEY ("roleId") REFERENCES public.roles ("id") ON DELETE CASCADE,
  FOREIGN KEY ("userId") REFERENCES public.user_credentials ("id") ON DELETE CASCADE
);
ALTER TABLE public.users_to_roles OWNER TO postgres;

INSERT INTO public.roles ("name")
SELECT 'admin'
WHERE NOT EXISTS (
  SELECT * FROM public.roles where name = 'admin'
);

INSERT INTO public.roles ("name")
SELECT 'user'
WHERE NOT EXISTS (
  SELECT * FROM public.roles where name = 'user'
);

/* periods */

DROP TYPE IF EXISTS period;
CREATE TYPE period AS ENUM ('MONTH', 'QUARTER', 'YEAR');

/* currencies */

CREATE TABLE IF NOT EXISTS public.currencies (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR UNIQUE NOT NULL,
  "code" VARCHAR UNIQUE NOT NULL,
  CONSTRAINT "pkey_currencies" PRIMARY KEY ("id")
);
ALTER TABLE public.currencies OWNER TO postgres;

INSERT INTO public.currencies ("name", "code")
SELECT 'Ukrainian hryvnya', 'UAH'
WHERE NOT EXISTS (
  SELECT * FROM public.currencies where name = 'Ukrainian hryvnya'
);

INSERT INTO public.currencies ("name", "code")
SELECT 'US dollar', 'USD'
WHERE NOT EXISTS (
  SELECT * FROM public.currencies where name = 'US dollar'
);

/* transaction categories, transaction, distributed metric items */

CREATE TABLE IF NOT EXISTS public.transaction_categories (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR NOT NULL,
  "parentCategoryId" UUID DEFAULT NULL,
  "ownerId" UUID DEFAULT NULL,
  "isSystem" BOOLEAN DEFAULT false,
  "isOutcome" BOOLEAN DEFAULT true,
  CONSTRAINT "pkey_categories" PRIMARY KEY ("id"),
  FOREIGN KEY ("parentCategoryId") REFERENCES public.transaction_categories ("id") ON DELETE CASCADE,
  FOREIGN KEY ("ownerId") REFERENCES public.user_credentials ("id") ON DELETE CASCADE
);
ALTER TABLE public.transaction_categories OWNER TO postgres;

CREATE INDEX IF NOT EXISTS "categories_owner_idx"
ON public.transaction_categories ("id", "ownerId");

CREATE INDEX IF NOT EXISTS "categories_top_idx"
ON public.transaction_categories ("isSystem" DESC, "parentCategoryId" DESC, "ownerId" DESC);

CREATE INDEX IF NOT EXISTS "categories_own_idx"
ON public.transaction_categories ("ownerId" ASC, "isSystem" ASC);

CREATE INDEX IF NOT EXISTS "categories_parent_idx"
ON public.transaction_categories ("parentCategoryId" ASC);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome")
SELECT 'Incomes', true, false
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Incomes' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Salary',
  true,
  false,
  (SELECT id FROM public.transaction_categories WHERE name = 'Incomes' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Salary' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Margin/dividends',
  true,
  false,
  (SELECT id FROM public.transaction_categories WHERE name = 'Incomes' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Margin/dividends' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Deposit interest',
  true,
  false,
  (SELECT id FROM public.transaction_categories WHERE name = 'Incomes' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Deposit interest' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome")
SELECT 'Expenses', true, true
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Expenses' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Groceries and food',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Groceries and food' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Shops/markets',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Groceries and food' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Shops/markets' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Restaurants/cafe/bars',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Groceries and food' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Restaurants/cafe/bars' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Cigarettes and alcohol',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Groceries and food' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Cigarettes and alcohol' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Household goods and cosmetics',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Household goods and cosmetics' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Medicine and health',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Medicine and health' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Insurance',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Medicine and health' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Insurance' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Medicines',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Medicine and health' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Medicines' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Doctor services',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Medicine and health' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Doctor services' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Treatment',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Medicine and health' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Treatment' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Sport',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Medicine and health' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Sport' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Savings',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Savings' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Renovation and household appliances/electronics',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Renovation and household appliances/electronics' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Minor home repairs',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Renovation and household appliances/electronics' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Minor home repairs' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Renewal',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Renovation and household appliances/electronics' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Renewal' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Decor and small goods',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Renovation and household appliances/electronics' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Decor and small goods' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Household appliances',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Renovation and household appliances/electronics' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Household appliances' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Electronics',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Renovation and household appliances/electronics' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Electronics' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Clothes and shoes',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Clothes and shoes' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Clothes',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Clothes and shoes' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Clothes' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Shoes',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Clothes and shoes' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Shoes' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Accessories',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Clothes and shoes' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Accessories' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Transport',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Transport' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Car',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Transport' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Car' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Taxi',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Transport' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Taxi' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Public transport',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Transport' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Public transport' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Communication and services',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Communication and services' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Internet',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Communication and services' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Internet' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'TV',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Communication and services' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'TV' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Communication services',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Communication and services' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Communication services' AND "isSystem" = true
);
INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Subscriptions',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Communication and services' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Subscriptions' AND "isSystem" = true
); 

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Bills',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Bills' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Rent',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Rent' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Taxes and penalts',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Taxes and penalts' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Insurance payments',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Insurance payments' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Entertainments and hobbies',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Entertainments and hobbies' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Gifts',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Gifts' AND "isSystem" = true
);

INSERT INTO public.transaction_categories ("name", "isSystem", "isOutcome", "parentCategoryId")
SELECT
  'Others',
  true,
  true,
  (SELECT id FROM public.transaction_categories WHERE name = 'Expenses' AND "isSystem" = true)
WHERE NOT EXISTS (
  SELECT * FROM public.transaction_categories where name = 'Others' AND "isSystem" = true
);

/* add indixes */

CREATE TABLE IF NOT EXISTS public.transactions (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "datetime" TIMESTAMP DEFAULT NOW(),
  "description" TEXT DEFAULT NULL,
  "amount" INT NOT NULL CHECK ("amount" > -1),
  "ownerId" UUID NOT NULL,
  "transactionCategoryId" UUID NOT NULL,
  "currencyId" UUID NOT NULL,
  CONSTRAINT "pkey_transactions" PRIMARY KEY ("id"),
  FOREIGN KEY ("ownerId") REFERENCES public.user_credentials ("id") ON DELETE CASCADE,
  FOREIGN KEY ("transactionCategoryId") REFERENCES public.transaction_categories ("id") ON DELETE CASCADE,
  FOREIGN KEY ("currencyId") REFERENCES public.currencies ("id") ON DELETE CASCADE
);
ALTER TABLE public.transactions OWNER TO postgres;

CREATE INDEX IF NOT EXISTS "transactions_owner_idx"
ON public.transactions ("id", "ownerId");

CREATE INDEX IF NOT EXISTS "transactions_owner_and_date_idx"
ON public.transactions ("ownerId", "datetime");

CREATE TABLE IF NOT EXISTS public.distributing_metric_items (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "metric" SMALLINT NOT NULL CHECK ("metric" > -1),
  "period" period NOT NULL,
  "userId" UUID NOT NULL,
  "transactionCategoryId" UUID NOT NULL,
  "currencyId" UUID NOT NULL,
  CONSTRAINT "pkey_distributing_metric_items" PRIMARY KEY ("id"),
  FOREIGN KEY ("userId") REFERENCES public.user_credentials ("id") ON DELETE CASCADE,
  FOREIGN KEY ("transactionCategoryId") REFERENCES public.transaction_categories ("id") ON DELETE CASCADE,
  FOREIGN KEY ("currencyId") REFERENCES public.currencies ("id") ON DELETE CASCADE
);
ALTER TABLE public.distributing_metric_items OWNER TO postgres;

CREATE INDEX IF NOT EXISTS "distributing_metric_items_period_idx"
ON public.distributing_metric_items ("period");