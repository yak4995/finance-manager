This project is my pet-project, that provided HTTP REST/GraphQL API for personal finance management and analysis. It implemented from Robert Martin "clear architecture" principles for more scalability and independent extensionsiability.

For user interfaces uses HTTPS protocol, for inter app communication - GRPC protocol, for data storage - Prisma2 ORM with PostgreSQL, for asyncronyous task executing and queueing - Redis and Kafka, for unit and e2e tests - jest library. Base programming language is TypeScript.

Project setup:
1. Execute "npm i && npm run init" ("npm run init" will create prisma subdir in you project with .env file for db creds and empty schema.prisma file for prisma client target platform/creds target/db schema definition in gql format) from project dir. Then replace the content of the prisma/schema.prisma file to
```
  generator client {
    provider = "prisma-client-js"
    binaryTargets = ["native"]
  }

  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
```
and the content of prisma/.env file to
```
  DATABASE_URL="postgresql://postgres:<make password that you put into POSTGRES_PASSWORD in the .env on the next step>@postgres:5432/<make db name that you put into POSTGRES_DB in the .env on the next step>?schema=public"
```
for docker or
```
  DATABASE_URL="postgresql://postgres:<make password that you put into POSTGRES_PASSWORD in the .env on the next step>@localhost:5432/<make db name that you put into POSTGRES_DB in the .env on the next step>?schema=public"
```
to local
2. Copy .env.docker.example/env.local.example files to .env/.env.local and replace there values with yours.
3. Create SSL-certificates (instructions see below) or put in its paths to .env file if you already have it.
4. Create empty "dbdata" dir in the project root, then execute "docker-compose build && docker-compose up -d", then "npm run start < needed appName >" for local deployment and "npm run build:prod && npm run start:prod" for docker deployment
5. Interactive documentation by endpoints locates here: https://{URL with deployed app}:{PORT of service}/api/docs
6. Migrations in SQL format locates here: dbscripts/init_migration.sql

Generate ssl certificate for localhost in terminal:

1.
```
  openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out server.key
```
2.
```
  openssl req -x509 -new -nodes -key server.key -sha256 -days 825 -out server.pem
```
3.
```
  NAME=localhost
```
4.
```
  openssl genrsa -out $NAME.key 2048
```
5.
```
  openssl req -new -key $NAME.key -out $NAME.csr
```
6.
```
  >$NAME.ext cat <<-EOF
  authorityKeyIdentifier=keyid,issuer
  basicConstraints=CA:FALSE
  keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = $NAME
  EOF
```
7.
```
  openssl x509 -req -in $NAME.csr -CA server.pem -CAkey server.key -CAcreateserial \
  -out $NAME.crt -days 825 -sha256 -extfile $NAME.ext
```

8. Add .pem file as trusted certificate in your GoogleChrome and paths to certifaicates to .env file.

GraphQL explanations:

In resolvers, that import GQL types, we import them from libs/common/src/graphql.schema.generated.ts, that will be created by NestJS GraphQLModule from libs/common/src/schema.graphql (graphql types for UI) when you run "npm i".

Prisma explanations:

Check Readme above for understanding initial setup. For synchronization between prisma/schema.prisma and generating typescript client with compiled gql schemas use "npm run migrate"

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Look instructions above.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Debugging

```bash
$ npm run start:debug
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code formatting and linting

```bash
# formatting
$ npm run format

#linting
$ npm run lint
```

## DB migrations execution

```bash
$ npm run migrate
```

## Generate documentation in compodoc format and serve it

```bash
$ npm run document
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
