This project is my pet-project, that provided HTTP REST/GraphQL API for personal finance management and analysis. It implemented from Robert Martin "clear architecture" principles for more scalability and independent extensionsiability.

For user interfaces uses HTTPS protocol, for data storage - cloud Prisma solution (MySQL with GraphQL interface), for asyncronyous task executing and queueing - Redis, for unit and e2e tests - jest library. Base programming language is TypeScript.

In future, I plan to transfer asyncronyous task executing and queueing to Kafka, logging and full-text search to ELK stack, authorization - to passwordless, infrastructure and CI/CD - to Docker and docker-compose. Also, the project architecture will be scaled to microservices accross GRPC protocol.

In future, the project will be extended with localization (by languages, default currencies and timezones), taxes management, inventory management, budget and cost-estimate management.

Preparation to DB using:
Copy .graphqlconfig.yml.example to .graphqlconfig.yml with own endpoint (you can get it via "npm install -g prisma && prisma init").
"prisma init" command will allow you create or use existing prisma server and will create for you default datamodel.prisma/datamodel.graphql (but replace it with datamodel.graphql from code repo) and prisma.yml (there you have replace "datamodel: datamodel.prisma" to "datamodel: datamodel.graphql").
"prisma deploy --force" will migrate DB schema from datamodel.graphql to prisma server and generate/update client typescript code to generated/prisma-client.
"prisma generate" just generate/update client typescript code to generated/prisma-client.
"npm install -g graphql-cli" will allow you to execute commands below (for NestJS PrismaModule), that also uses .graphqlconfig.yml:
"graphql get-schema --project database" will download Prisma GraphQL schema to src/infrastructure/persistance/prisma/prisma-types.graphql.
"graphql codegen --project database" will create Prisma client under src/infrastructure/persistance/prisma/prisma.binding.ts.

PrismaModule uses modules from "generated" path, so you should execute "npm run migrate" before start.
PrismaService for PrismaModule has to extend (and instantiate it with super(...)) Prisma class from prisma.binding.ts, that has been created by "graphql codegen --project database" command.

In resolvers, that import GQL types, we import them from src/infrastructure/graphql.schema.generated.ts, that will be created by NestJS GraphQLModule from src/infrastructure/ui/schema.graphql (graphql types for UI) when you start the app.

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

```bash
$ npm install
```

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code formatting

```bash
$ npm run format
```

## DB migrations execution

```bash
$ npm run migrate
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
