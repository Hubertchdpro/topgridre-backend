import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.expertProfile.createMany({
    data: [
      {
        displayName: 'Expert_GridOps_1123',
        title: 'NERC CIP Specialist',
        public: false,
        hourlyRateCents: 20000,
        yearsExperience: 12,
        coreStandards: ['CIP-007','CIP-005'],
        resumeText: null
      },
      {
        displayName: 'Jane Doe',
        title: 'O&P Lead',
        public: true,
        hourlyRateCents: 15000,
        yearsExperience: 8,
        coreStandards: ['PRC-005','TOP-001'],
        resumeText: 'Senior O&P engineer…'
      }
    ]
  });
  await prisma.news.create({
    data: {
      title: 'NERC issues example update',
      summary: 'Example summary',
      body: '<p>Details...</p>',
      tags: ['CIP']
    }
  });
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>process.exit(0));
