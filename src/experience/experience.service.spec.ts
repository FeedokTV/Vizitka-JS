import { ExperienceService } from './experience.service';

describe('ExperienceService', () => {
  const service = new ExperienceService();

  it('treats experience without endDate as current', () => {
    expect(service.isCurrent({ startDate: new Date('2024-01-01'), endDate: null })).toBe(true);
    expect(
      service.isCurrent({ startDate: new Date('2024-01-01'), endDate: new Date('2024-06-01') }),
    ).toBe(false);
  });

  it('counts full months between dates', () => {
    const period = { startDate: new Date('2022-06-01'), endDate: new Date('2024-02-29') };
    expect(service.durationMonths(period)).toBe(20);
  });

  it('counts current experience up to now', () => {
    const period = { startDate: new Date('2024-03-15'), endDate: null };
    expect(service.durationMonths(period, new Date('2024-06-14'))).toBe(2);
    expect(service.durationMonths(period, new Date('2024-06-15'))).toBe(3);
  });
});
