import { Injectable } from '@nestjs/common';
import { Experience } from '@prisma/client';

type Period = Pick<Experience, 'startDate' | 'endDate'>;

@Injectable()
export class ExperienceService {
  isCurrent(experience: Period): boolean {
    return experience.endDate === null;
  }

  durationMonths(experience: Period, now: Date = new Date()): number {
    const end = experience.endDate ?? now;
    const start = experience.startDate;
    const months =
      (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
      (end.getUTCMonth() - start.getUTCMonth()) -
      (end.getUTCDate() < start.getUTCDate() ? 1 : 0);
    return Math.max(months, 0);
  }
}
