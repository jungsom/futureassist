import { Router } from 'express';
import {
  HealthRecordByUserId,
  PostHealthRecord,
  UpdateHealthRecord
} from '../controllers/healthController';
import { verifyAccessToken } from '../middlewares/jwt';
import { validationMiddleware } from '../middlewares/validation';
import { healthRecordDto } from '../dtos/healthDto';

const healthRouter = Router();

healthRouter.post(
  '/',
  verifyAccessToken,
  validationMiddleware(healthRecordDto),
  PostHealthRecord
);
healthRouter.put(
  '/',
  verifyAccessToken,
  validationMiddleware(healthRecordDto),
  UpdateHealthRecord
);
healthRouter.get(
  '/',
  verifyAccessToken,
  validationMiddleware(healthRecordDto),
  HealthRecordByUserId
);

export default healthRouter;
