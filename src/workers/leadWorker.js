import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from '../prismaClient.js';
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');
const worker = new Worker('leadQueue', async job => {
  if (job.name === 'new-lead') {
    const { leadId } = job.data;
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    console.log('Processing lead:', lead);
    await prisma.lead.update({ where: { id: leadId }, data: { status: 'triage' } });
  }
}, { connection });
worker.on('completed', job => console.log(`Job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Job ${job.id} failed`, err));
console.log('Lead worker started');
