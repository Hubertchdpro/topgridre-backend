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

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://topgridre-frontend-r9s9.vercel.app",
  "http://localhost:3000"
];

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

// ✅ Important pour OPTIONS
app.options('*', cors());

// ✅ Headers fallback
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "https://topgridre-frontend-r9s9.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req,res) => res.send('Top GridRE API running ✅'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 API listening on port ${port}`));
