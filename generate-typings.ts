import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/infrastructure/ui/schema.graphql'],
  path: join(
    process.cwd(),
    'src/infrastructure/graphql.schema.generated.ts',
  ),
  outputAs: 'class',
});