import { Router } from 'express';

import * as D from '../handlers/doc';
import { isAdmin } from '../middlewares/isAdmin';
import { protect } from '../middlewares/protect';
import { upload } from '../middlewares/upload';
import { createDocVal, updateDocVal } from '../validators/doc.val';

const router = Router();
router.route('/').post(protect, isAdmin, upload, createDocVal, D.createDoc).get(D.getDocList);
router
  .route('/:id')
  .get(D.getDoc)
  .patch(protect, isAdmin, upload, updateDocVal, D.updateDoc)
  .delete(protect, isAdmin, D.deleteDoc);
router.route('/:id/download').get(protect, D.downloadDoc);
export default router;
