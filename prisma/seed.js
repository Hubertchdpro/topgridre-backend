//  import { prisma } from '../src/prismaClient.js'; // <-- import de l'instance partagée(primasclient.js)


// async function main() {
//   // ---------- USERS ----------
//   const user1 = await prisma.user.upsert({
//     where: { email: "client1@example.com" },
//     update: {},
//     create: {
//       email: "client1@example.com",
//       name: "Alice Dupont",
//       role: "client"
//     }
//   });

//   const expertUser = await prisma.user.upsert({
//     where: { email: "expert1@example.com" },
//     update: {},
//     create: {
//       email: "expert1@example.com",
//       name: "Dr. John Doe",
//       role: "expert"
//     }
//   });

//   // ---------- EXPERT PROFILE ----------
//   const existingProfile = await prisma.expertProfile.findUnique({
//     where: { id: expertUser.id } // utiliser id unique si possible
//   });

//   if (!existingProfile) {
//     await prisma.expertProfile.create({
//       data: {
//         userId: expertUser.id,
//         displayName: "John Doe",
//         title: "Consultant en cybersécurité",
//         hourlyRateCents: 15000,
//         yearsExperience: 8,
//         coreStandards: ["ISO27001", "GDPR", "CIS"],
//         resumeText: "Expert en cybersécurité avec plus de 8 ans d'expérience."
//       }
//     });
//   }

//   // ---------- NEWS ----------
//   const newsData = [
//     {
//       title: "Lancement de la nouvelle plateforme",
//       summary: "Nous annonçons le lancement de notre nouvelle plateforme...",
//       body: "Texte détaillé de l’annonce...",
//       tags: ["tech", "startup"]
//     },
//     {
//       title: "Mise à jour de sécurité",
//       summary: "Une nouvelle mise à jour de sécurité a été publiée...",
//       body: "Détails techniques de la mise à jour...",
//       tags: ["sécurité", "update"]
//     }
//   ];

//   for (const newsItem of newsData) {
//     const existing = await prisma.news.findFirst({
//       where: { title: newsItem.title }
//     });
//     if (!existing) {
//       await prisma.news.create({ data: newsItem });
//     }
//   }

//   // ---------- LEADS ----------
// const existingLead = await prisma.lead.findFirst({
//   where: { email: "contact@societex.com" }
// });

// if (!existingLead) {
//   await prisma.lead.create({
//     data: {
//       name: "Société X",
//       email: "contact@societex.com",
//       company: "Société X",
//       payload: { interest: "audit cybersécurité" },
//       status: "new"
//     }
//   });
// }


//   console.log("✅ Seed terminé avec succès !");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
