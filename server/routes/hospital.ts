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

const hospitalRouter = Router();

hospitalRouter.get('/sido', getSido);
hospitalRouter.get('/sigu', validationMiddleware(SidoDTO, 'query'), getSigu);
hospitalRouter.get('/dong', validationMiddleware(SiguDTO, 'query'), getDong);
hospitalRouter.get('/specialities', getSpeciality);
hospitalRouter.get(
  '/search',
  validationMiddleware(SearchHospitalDTO, 'query'),
  searchHospital
);
hospitalRouter.get(
  '/location',
  validationMiddleware(LocationDTO, 'query'),
  getHospitalsByLocation
);
hospitalRouter.get(
  '/detaileddata',
  validationMiddleware(HospitalIdDTO, 'query'),
  getHospitalDetail
);
hospitalRouter.post(
  '/record',
  verifyAccessToken,
  validationMiddleware(HospitalIdDTO),
  saveHospitalRecord
);
hospitalRouter.delete(
  '/record',
  verifyAccessToken,
  validationMiddleware(HospitalIdDTO),
  deleteHospitalRecord
);
hospitalRouter.get('/record', verifyAccessToken, getHospitalRecordsByUser);

export default hospitalRouter;
