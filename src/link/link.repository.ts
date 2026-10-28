import { Injectable } from '@nestjs/common';
import { Link } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileIds(profileIds: readonly string[]): Promise<Link[]> {
    return this.prisma.link.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { order: 'asc' },
    });
  }
}
