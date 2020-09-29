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
  "passwordHash" VARCHAR NOT NULL,
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