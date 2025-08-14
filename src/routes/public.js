import express from 'express';
import { prisma } from '../prismaClient.js';
const router = express.Router();

router.get('/experts', async (req, res) => {
  const publicOnly = req.query.publicOnly === 'true';
  const where = publicOnly ? { public: true } : {};
  const list = await prisma.expertProfile.findMany({ where });
  res.json(list);
});

router.get('/news', async (req, res) => {
  const list = await prisma.news.findMany({ orderBy: { publishDate: 'desc' } });
  res.json(list);
});

export default router;
