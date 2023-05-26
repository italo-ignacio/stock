/* eslint-disable @typescript-eslint/no-magic-numbers */
import { badRequest } from '@main/utils';
import { env } from '@main/config';
import { messages } from '@domain/helpers';
import multer, { MulterError, diskStorage } from 'multer';
import path from 'path';
import type { NextFunction, Request, Response } from 'express';

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, `./src/static/uploads/${env.staticPaths.images}`);
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname);
    const allowedExtensions = ['.jpeg', '.png', '.webp', '.avif'];

    if (allowedExtensions.includes(extension)) cb(null, `${Date.now()}-${file.originalname}`);
    else cb(new Error(''), '');
  }
});

export const uploadOneFileMiddleware = multer({
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  storage
}).single('image');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type, max-params, unused-imports/no-unused-vars
export const handleMulterError = (
  err: Error,
  req: Request,
  response: Response,
  next: NextFunction
  // eslint-disable-next-line consistent-return, max-params
) => {
  if (err instanceof MulterError)
    return badRequest({ message: messages.default.uploadError, response });
  if (err instanceof Error) return badRequest({ message: messages.default.badFile, response });
  next();
};
