import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfile(id?: string): Promise<Profile> {
    const profile = id
      ? await this.profileRepository.findById(id)
      : await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException(id ? `Profile "${id}" not found` : 'Profile is not seeded yet');
    }
    return profile;
  }

  getProfiles(): Promise<Profile[]> {
    return this.profileRepository.findAll();
  }
}
