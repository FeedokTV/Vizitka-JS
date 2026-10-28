import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Experience, ExperiencePeriod } from './experience.model';
import { ExperienceService } from './experience.service';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @ResolveField(() => ExperiencePeriod, { description: 'Вычисляемые данные о периоде работы' })
  period(@Parent() experience: Experience): ExperiencePeriod {
    return {
      isCurrent: this.experienceService.isCurrent(experience),
      durationMonths: this.experienceService.durationMonths(experience),
    };
  }
}
