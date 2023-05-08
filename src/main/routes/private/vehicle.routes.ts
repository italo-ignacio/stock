import { Router } from 'express';
import {
  deleteVehicleController,
  findOneVehicleController,
  findVehicleController,
  insertVehicleController,
  updateVehicleFleetController
} from '@application/controller/vehicle';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertVehicleController());
  router.get('', findVehicleController());
  router.get('/:id', findOneVehicleController());
  router.delete('/:id', deleteVehicleController());
  router.put('/:id', updateVehicleFleetController());

  inputRouter.use('/vehicle', router);
};
