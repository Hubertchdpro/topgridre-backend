import express from 'express';
import { prisma } from '../prismaClient.js';
const router = express.Router();

router.get('/experts', async (req, res) => {
  const publicOnly = req.query.publicOnly === 'true';
  const where = publicOnly ? { public: true } : {};
  console.log('Fetching experts with filter:', where);
  // const list = await prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' } });
  const list = await prisma.expertProfile.findMany({ where });
  res.json(list);
});

router.get('/news', async (req, res) => {
  const list = await prisma.news.findMany({ orderBy: { publishDate: 'desc' } });
  res.json(list);
});

export default router;
