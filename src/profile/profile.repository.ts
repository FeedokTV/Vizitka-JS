import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({ orderBy: { createdAt: 'asc' } });
  }

  findFirst(): Promise<Profile | null> {
    return this.prisma.profile.findFirst({ orderBy: { createdAt: 'asc' } });
  }
}
