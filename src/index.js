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

// ✅ Liste des origines autorisées (frontend déployé + localhost)
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://topgridre-frontend-r9s9.vercel.app",
  "http://localhost:3000"
];

// ✅ Config CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// ✅ Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadRoutes);

// ✅ Route test
app.get('/', (req,res) => res.send('Top GridRE API running ✅'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 API listening on port ${port}`));
