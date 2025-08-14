import express from 'express';
import { prisma } from '../prismaClient.js';
import { leadQueue } from '../queues/leadQueue.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const payload = req.body || {};
  const lead = await prisma.lead.create({ data: { name: payload.name || null, email: payload.email || null, company: payload.company || null, payload } });
  await leadQueue.add('new-lead', { leadId: lead.id });
  res.status(201).json(lead);
});

export default router;
