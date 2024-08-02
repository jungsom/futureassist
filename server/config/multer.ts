import multer from 'multer';
import path from 'path';

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      done(null, timestamp + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});
