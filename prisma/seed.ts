import { PrismaClient } from '@prisma/client';
import { seedData } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  const { profile, links, skills, experience, projects } = seedData;
  const profileId = profile.id;
  const withOrder = <T>(items: T[]) => items.map((item, order) => ({ ...item, order, profileId }));

  await prisma.$transaction([
    prisma.profile.upsert({ where: { id: profileId }, create: profile, update: profile }),
    prisma.link.deleteMany({ where: { profileId } }),
    prisma.skill.deleteMany({ where: { profileId } }),
    prisma.experience.deleteMany({ where: { profileId } }),
    prisma.project.deleteMany({ where: { profileId } }),
    prisma.link.createMany({ data: withOrder(links) }),
    prisma.skill.createMany({ data: withOrder(skills) }),
    prisma.experience.createMany({ data: experience.map((item) => ({ ...item, profileId })) }),
    prisma.project.createMany({ data: withOrder(projects) }),
  ]);

  console.log(`Seed completed for profile "${profileId}"`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
