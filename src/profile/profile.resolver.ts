import { Args, Context, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLContext } from '../common/graphql-context';
import { Experience } from '../experience/experience.model';
import { Link } from '../link/link.model';
import { Project } from '../project/project.model';
import { Skill } from '../skill/skill.model';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { description: 'Профиль по id или основной профиль, если id не указан' })
  profile(@Args('id', { type: () => ID, nullable: true }) id?: string): Promise<Profile> {
    return this.profileService.getProfile(id);
  }

  @Query(() => [Profile])
  profiles(): Promise<Profile[]> {
    return this.profileService.getProfiles();
  }

  @ResolveField(() => [Link])
  links(@Parent() profile: Profile, @Context() { loaders }: GraphQLContext) {
    return loaders.linksByProfileId.load(profile.id);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile, @Context() { loaders }: GraphQLContext) {
    return loaders.skillsByProfileId.load(profile.id);
  }

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile, @Context() { loaders }: GraphQLContext) {
    return loaders.experienceByProfileId.load(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile, @Context() { loaders }: GraphQLContext) {
    return loaders.projectsByProfileId.load(profile.id);
  }
}
