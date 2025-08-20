import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Check if data already exists
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log('Database already seeded, skipping...');
    return;
  }

  // Create users
  console.log('Creating users...');
  const user1 = await prisma.user.create({
    data: {
      email: "client1@example.com",
      name: "Alice Dupont",
      role: "client"
    }
  });

  const expertUser = await prisma.user.create({
    data: {
      email: "expert1@example.com",
      name: "Dr. John Doe",
      role: "expert"
    }
  });

  // Create expert profile
  console.log('Creating expert profile...');
  await prisma.expertProfile.create({
    data: {
      userId: expertUser.id,
      displayName: "John Doe",
      title: "NERC Compliance Expert",
      hourlyRateCents: 15000,
      yearsExperience: 8,
      coreStandards: ["CIP-002", "CIP-003", "CIP-007"],
      resumeText: "Expert in NERC compliance with over 8 years of experience in critical infrastructure protection."
    }
  });

  // Create additional expert profiles without userId
  console.log('Creating additional expert profiles...');
  await prisma.expertProfile.createMany({
    data: [
      {
        displayName: "Sarah Johnson",
        title: "CIP Standards Specialist",
        hourlyRateCents: 12000,
        yearsExperience: 6,
        coreStandards: ["CIP-004", "CIP-005", "CIP-006"],
        resumeText: "Specialized in cybersecurity framework implementation for utility companies."
      },
      {
        displayName: "Michael Chen",
        title: "O&P Compliance Advisor",
        hourlyRateCents: 18000,
        yearsExperience: 12,
        coreStandards: ["TOP-001", "VAR-002", "IRO-010"],
        resumeText: "Veteran operations and planning compliance expert with utility and consulting experience."
      }
    ]
  });

  // Create news articles
  console.log('Creating news articles...');
  await prisma.news.createMany({
    data: [
      {
        title: "New NERC CIP Standards Updates for 2025",
        summary: "NERC announces updates to critical infrastructure protection standards effective 2025...",
        body: "The North American Electric Reliability Corporation (NERC) has released updates to several CIP standards that will take effect in 2025. These changes focus on enhanced cybersecurity measures and improved incident response protocols for critical infrastructure protection.",
        tags: ["CIP", "cybersecurity", "standards"]
      },
      {
        title: "Grid Modernization and Compliance Challenges",
        summary: "As the electrical grid modernizes, new compliance challenges emerge for utilities...",
        body: "The modernization of the electrical grid brings both opportunities and challenges for utility compliance programs. Smart grid technologies, renewable energy integration, and distributed resources create new compliance considerations under existing NERC standards.",
        tags: ["modernization", "smart-grid", "compliance"]
      },
      {
        title: "Best Practices for NERC Audit Preparation",
        summary: "Expert recommendations for preparing for upcoming NERC compliance audits...",
        body: "Preparation for NERC compliance audits requires systematic documentation, evidence collection, and gap analysis. This article outlines proven strategies for audit readiness and common pitfalls to avoid during the audit process.",
        tags: ["audit", "preparation", "best-practices"]
      }
    ]
  });

  // Create sample leads
  console.log('Creating sample leads...');
  await prisma.lead.createMany({
    data: [
      {
        name: "Regional Utility Corp",
        email: "compliance@regionalutility.com",
        company: "Regional Utility Corp",
        payload: { 
          interest: "CIP compliance audit preparation",
          roleType: "CIP",
          message: "Need help preparing for upcoming CIP-002 compliance audit"
        },
        status: "new"
      },
      {
        name: "Metro Power Co",
        email: "ops@metropower.com", 
        company: "Metro Power Co",
        payload: {
          interest: "Operations planning consultation",
          roleType: "OP",
          message: "Looking for expertise in TOP-001 compliance implementation"
        },
        status: "new"
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });