import { Router } from 'express';
import {
  getSido,
  getSigu,
  getDong,
  searchHospital,
  getHospitalDetail,
} from '../controllers/hospitalController';

const router = Router();

router.get('/sido', getSido);
router.get('/sigu', getSigu);
router.get('/dong', getDong);
router.get('/search', searchHospital);
router.get('/detaileddata', getHospitalDetail);

export default router;
