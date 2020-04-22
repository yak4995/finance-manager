import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      typePaths: ['./src/infrastructure/ui/schema.graphql'],
      path: '/graphql',
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      definitions: {
        path: join(
          process.cwd(),
          'src/infrastructure/graphql.schema.generated.ts',
        ),
        outputAs: 'class',
      },
      debug: this.configService.get('DEBUG') === 'true',
      introspection: true,
      context: ({ req }) => ({ req }),
    };
  }
}
