import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/finance-manager/src/ui/schema.graphql'],
  path: join(
    process.cwd(),
    'apps/finance-manager/src/graphql.schema.generated.ts',
  ),
  outputAs: 'class',
});