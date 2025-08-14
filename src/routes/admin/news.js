import express from 'express';
import { prisma } from '../../prismaClient.js';
const router = express.Router();
router.get('/', async (req,res)=>{ const list = await prisma.news.findMany({ orderBy:{ publishDate:'desc' } }); res.json(list); });
router.post('/', async (req,res)=>{ const created = await prisma.news.create({ data: req.body }); res.json(created); });
router.put('/:id', async (req,res)=>{ const updated = await prisma.news.update({ where:{ id:req.params.id }, data: req.body }); res.json(updated); });
router.delete('/:id', async (req,res)=>{ await prisma.news.delete({ where:{ id:req.params.id } }); res.json({ success:true }); });
export default router;
