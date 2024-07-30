import { Router } from 'express';
import {
  getSido,
  getSigu,
  getDong,
  searchHospital,
  getHospitalsByLocation,
  getHospitalDetail
} from '../controllers/hospitalController';

const router = Router();

router.get('/sido', getSido);
router.get('/sigu', getSigu);
router.get('/dong', getDong);
router.get('/search', searchHospital);
router.get('/location', getHospitalsByLocation);
router.get('/detaileddata', getHospitalDetail);

export default router;
