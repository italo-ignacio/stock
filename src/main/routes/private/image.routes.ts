/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Router } from 'express';
import { handleMulterError, uploadOneFileMiddleware } from '@main/middleware/upload';
import { insertVehicleImageController } from '@application/controller/insert-image';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/', uploadOneFileMiddleware, handleMulterError, insertVehicleImageController());

  inputRouter.use('/image', router);
};
