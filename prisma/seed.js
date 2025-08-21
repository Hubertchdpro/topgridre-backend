import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Check if already seeded
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log("⚡ Database already seeded, skipping...");
    return;
  }

  // === Users ===
  console.log("👤 Creating users...");
  const client1 = await prisma.user.create({
    data: {
      email: "client1@example.com",
      name: "Alice Dupont",
      role: "client",
    },
  });

  const expertUser = await prisma.user.create({
    data: {
      email: "expert1@example.com",
      name: "Dr. John Doe",
      role: "expert",
    },
  });

  // === ExpertProfile ===
  console.log("📚 Creating expert profiles...");
  await prisma.expertProfile.create({
    data: {
      userId: expertUser.id,
      displayName: "John Doe",
      title: "NERC Compliance Expert",
      hourlyRateCents: 15000,
      yearsExperience: 8,
      coreStandards: ["CIP-002", "CIP-003", "CIP-007"],
      resumeText:
        "Expert in NERC compliance with over 8 years of experience in critical infrastructure protection.",
    },
  });

  await prisma.expertProfile.createMany({
    data: [
      {
        displayName: "Sarah Johnson",
        title: "CIP Standards Specialist",
        hourlyRateCents: 12000,
        yearsExperience: 6,
        coreStandards: ["CIP-004", "CIP-005", "CIP-006"],
        resumeText:
          "Specialized in cybersecurity framework implementation for utility companies.",
      },
      {
        displayName: "Michael Chen",
        title: "O&P Compliance Advisor",
        hourlyRateCents: 18000,
        yearsExperience: 12,
        coreStandards: ["TOP-001", "VAR-002", "IRO-010"],
        resumeText:
          "Veteran operations and planning compliance expert with utility and consulting experience.",
      },
    ],
  });

  // === News ===
  console.log("📰 Creating news articles...");
  await prisma.news.createMany({
    data: [
      {
        title: "New NERC CIP Standards Updates for 2025",
        summary: "NERC announces updates to CIP standards effective 2025...",
        body: "The North American Electric Reliability Corporation (NERC) has released updates...",
        tags: ["CIP", "cybersecurity", "standards"],
      },
      {
        title: "Grid Modernization and Compliance Challenges",
        summary: "As the electrical grid modernizes, new compliance challenges emerge...",
        body: "Smart grid technologies, renewable energy integration, and distributed resources...",
        tags: ["modernization", "smart-grid", "compliance"],
      },
      {
        title: "Best Practices for NERC Audit Preparation",
        summary: "Expert recommendations for audit readiness...",
        body: "Preparation for NERC compliance audits requires systematic documentation...",
        tags: ["audit", "preparation", "best-practices"],
      },
    ],
  });

  // === Leads ===
  console.log("📩 Creating sample leads...");
  await prisma.lead.createMany({
    data: [
      {
        name: "Regional Utility Corp",
        email: "compliance@regionalutility.com",
        company: "Regional Utility Corp",
        payload: {
          interest: "CIP compliance audit preparation",
          roleType: "CIP",
          message: "Need help preparing for upcoming CIP-002 compliance audit",
        },
        status: "new",
        userId: client1.id,
      },
      {
        name: "Metro Power Co",
        email: "ops@metropower.com",
        company: "Metro Power Co",
        payload: {
          interest: "Operations planning consultation",
          roleType: "OP",
          message: "Looking for expertise in TOP-001 compliance implementation",
        },
        status: "new",
        userId: client1.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected from database");
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
