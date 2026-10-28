import { Injectable } from '@nestjs/common';
import { Experience, Link, Project, Skill } from '@prisma/client';
import DataLoader from 'dataloader';
import { groupByKey } from '../common/group-by-key';
import { ExperienceRepository } from '../experience/experience.repository';
import { LinkRepository } from '../link/link.repository';
import { ProjectRepository } from '../project/project.repository';
import { SkillRepository } from '../skill/skill.repository';

export interface Loaders {
  linksByProfileId: DataLoader<string, Link[]>;
  skillsByProfileId: DataLoader<string, Skill[]>;
  experienceByProfileId: DataLoader<string, Experience[]>;
  projectsByProfileId: DataLoader<string, Project[]>;
}

@Injectable()
export class LoadersService {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly skillRepository: SkillRepository,
    private readonly experienceRepository: ExperienceRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  create(): Loaders {
    return {
      linksByProfileId: this.byProfileId((ids) => this.linkRepository.findByProfileIds(ids)),
      skillsByProfileId: this.byProfileId((ids) => this.skillRepository.findByProfileIds(ids)),
      experienceByProfileId: this.byProfileId((ids) =>
        this.experienceRepository.findByProfileIds(ids),
      ),
      projectsByProfileId: this.byProfileId((ids) => this.projectRepository.findByProfileIds(ids)),
    };
  }

  private byProfileId<T extends { profileId: string }>(
    fetch: (profileIds: readonly string[]) => Promise<T[]>,
  ): DataLoader<string, T[]> {
    return new DataLoader(async (profileIds) =>
      groupByKey(profileIds, await fetch(profileIds), (row) => row.profileId),
    );
  }
}
