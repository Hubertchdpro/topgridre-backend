import express from 'express';
import adminExperts from './admin/experts.js';
import adminNews from './admin/news.js';
import adminAuth from './middleware/adminAuth.js';
const router = express.Router();
router.use(adminAuth);
router.use('/experts', adminExperts);
router.use('/news', adminNews);
export default router;
