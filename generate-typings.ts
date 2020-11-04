import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./libs/common/src/schema.graphql'],
  path: join(
    process.cwd(),
    'libs/common/src/graphql.schema.generated.ts',
  ),
  outputAs: 'class',
});