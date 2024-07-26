import { Router } from 'express';
import {
  getSido,
  getSigu,
  getDong,
  searchHospital,
} from '../controllers/hospitalController';

const router = Router();

router.get('/sido', getSido);
router.get('/sigu', getSigu);
router.get('/dong', getDong);
router.get('/search', searchHospital);

export default router;
