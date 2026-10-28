import { NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  const profile = { id: 'main', name: 'Name', description: 'Desc', createdAt: new Date(), updatedAt: new Date() };

  const createService = (found: typeof profile | null) => {
    const repository = {
      findById: jest.fn().mockResolvedValue(found),
      findFirst: jest.fn().mockResolvedValue(found),
    } as unknown as ProfileRepository;
    return { service: new ProfileService(repository), repository };
  };

  it('returns the main profile when id is not provided', async () => {
    const { service, repository } = createService(profile);
    await expect(service.getProfile()).resolves.toBe(profile);
    expect(repository.findFirst).toHaveBeenCalled();
  });

  it('looks up profile by id', async () => {
    const { service, repository } = createService(profile);
    await service.getProfile('main');
    expect(repository.findById).toHaveBeenCalledWith('main');
  });

  it('throws NotFoundException when profile is missing', async () => {
    const { service } = createService(null);
    await expect(service.getProfile('unknown')).rejects.toBeInstanceOf(NotFoundException);
  });
});
