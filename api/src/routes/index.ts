import { Router } from 'express';

import docRoutes from './doc.route';
import userRoutes from './user.route';

const router = Router();
router.use('/auth', userRoutes);
router.use('/doc', docRoutes);
export default router;
