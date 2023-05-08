import { env } from '@main/config';
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, `./static/uploads/${env.staticPaths.images}`);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const uploadOneFileMiddleware = multer({
  storage
}).single('image');
