import { Router } from 'express';
import {
  deleteVehicleFleetController,
  findOneVehicleFleetController,
  findVehicleFleetController,
  insertVehicleFleetController,
  updateVehicleFleetController
} from '@application/controller/vehicle-fleet';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertVehicleFleetController());
  router.get('', findVehicleFleetController());
  router.get('/:id', findOneVehicleFleetController());
  router.delete('/:id', deleteVehicleFleetController());
  router.put('/:id', updateVehicleFleetController());

  inputRouter.use('/vehicle-fleet', router);
};
