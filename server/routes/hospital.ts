import { Router } from 'express';
import {
  getSido,
  getSigu,
  getDong,
  getSpeciality,
  searchHospital,
  getHospitalsByLocation,
  getHospitalDetail,
  saveHospitalRecord,
  deleteHospitalRecord,
  getHospitalRecordsByUser
} from '../controllers/hospitalController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import {
  SidoDTO,
  SiguDTO,
  SearchHospitalDTO,
  LocationDTO,
  HospitalIdDTO
} from '../dtos/hospitalDto';

const router = Router();

router.get('/sido', getSido);
router.get('/sigu', validationMiddleware(SidoDTO, 'query'), getSigu);
router.get('/dong', validationMiddleware(SiguDTO, 'query'), getDong);
router.get('/specialities', getSpeciality);
router.get(
  '/search',
  validationMiddleware(SearchHospitalDTO, 'query'),
  searchHospital
);
router.get(
  '/location',
  validationMiddleware(LocationDTO, 'query'),
  getHospitalsByLocation
);
router.get(
  '/detaileddata',
  validationMiddleware(HospitalIdDTO, 'query'),
  getHospitalDetail
);
router.post(
  '/record',
  verifyAccessToken,
  validationMiddleware(HospitalIdDTO),
  saveHospitalRecord
);
router.delete(
  '/record',
  verifyAccessToken,
  validationMiddleware(HospitalIdDTO),
  deleteHospitalRecord
);
router.get('/record', verifyAccessToken, getHospitalRecordsByUser);

export default router;
