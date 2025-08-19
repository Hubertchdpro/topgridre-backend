
const prisma = new PrismaClient()

async function main() {
  // Utilisateurs
  const user1 = await prisma.user.create({
    data: {
      email: "client1@example.com",
      name: "Alice Dupont",
      role: "client"
    }
  })

  const expertUser = await prisma.user.create({
    data: {
      email: "expert1@example.com",
      name: "Dr. John Doe",
      role: "expert"
    }
  })

  // Profil Expert
  await prisma.expertProfile.create({
    data: {
      userId: expertUser.id,
      displayName: "John Doe",
      title: "Consultant en cybersécurité",
      hourlyRateCents: 15000,
      yearsExperience: 8,
      coreStandards: ["ISO27001", "GDPR", "CIS"],
      resumeText: "Expert en cybersécurité avec plus de 8 ans d'expérience."
    }
  })

  // Actualités
  await prisma.news.createMany({
    data: [
      {
        title: "Lancement de la nouvelle plateforme",
        summary: "Nous annonçons le lancement de notre nouvelle plateforme...",
        body: "Texte détaillé de l’annonce...",
        tags: ["tech", "startup"]
      },
      {
        title: "Mise à jour de sécurité",
        summary: "Une nouvelle mise à jour de sécurité a été publiée...",
        body: "Détails techniques de la mise à jour...",
        tags: ["sécurité", "update"]
      }
    ]
  })

  // Leads
  await prisma.lead.create({
    data: {
      name: "Société X",
      email: "contact@societex.com",
      company: "Société X",
      payload: { interest: "audit cybersécurité" },
      status: "new"
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })