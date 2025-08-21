import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import leadRoutes from './routes/lead.js';
import './workers/leadWorker.js';
dotenv.config();
const app = express();
app.use(cors({ 
  origin: [
    'http://localhost:3000',
    'https://topgridre-frontend-r9s9.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadRoutes);
app.get('/', (req,res) => res.send('Top GridRE API'));
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`API listening on ${port}`));
