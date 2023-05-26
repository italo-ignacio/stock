/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Router } from 'express';
import {
  deleteVehicleController,
  findOneVehicleController,
  findVehicleController,
  insertVehicleController,
  updateVehicleController
} from '@application/controller/vehicle';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertVehicleController());
  router.get('', findVehicleController());
  router.get('/:id', findOneVehicleController());
  router.delete('/:id', deleteVehicleController());
  router.put('/:id', updateVehicleController());

  inputRouter.use('/vehicle', router);
};
