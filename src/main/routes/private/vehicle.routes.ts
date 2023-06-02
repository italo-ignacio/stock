/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Router } from 'express';
import {
  deleteVehicleController,
  findOneVehicleController,
  findVehicleController,
  insertVehicleController,
  updateVehicleController
} from '@application/controller/vehicle';
import { handleMulterError, insertImage, uploadOneFileMiddleware } from '@main/middleware/upload';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post(
    '',
    uploadOneFileMiddleware,
    handleMulterError,
    insertImage(),
    insertVehicleController()
  );
  router.get('', findVehicleController());
  router.get('/:id', findOneVehicleController());
  router.put(
    '/:id',
    uploadOneFileMiddleware,
    handleMulterError,
    insertImage(),
    updateVehicleController()
  );
  router.delete('/:id', deleteVehicleController());

  inputRouter.use('/vehicle', router);
};
