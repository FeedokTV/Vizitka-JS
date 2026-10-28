import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLContext } from './common/graphql-context';
import { LoadersModule } from './loaders/loaders.module';
import { LoadersService } from './loaders/loaders.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExperienceModule } from './experience/experience.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoadersModule],
      inject: [LoadersService],
      useFactory: (loaders: LoadersService) => ({
        autoSchemaFile: true,
        sortSchema: true,
        playground: false,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: (): GraphQLContext => ({ loaders: loaders.create() }),
      }),
    }),
    ProfileModule,
    ExperienceModule,
  ],
})
export class AppModule {}
