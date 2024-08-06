import multer from 'multer';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY as string
  },
  region: 'ap-northeast-2'
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET as string,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      callback(null, `uploads/${timestamp}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한 (5MB)
});
