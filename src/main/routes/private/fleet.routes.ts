import { Router } from 'express';
import {
  deleteFleetController,
  findFleetController,
  findOneFleetController,
  insertFleetController,
  updateFleetController
} from '@application/controller/fleet';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertFleetController());
  router.get('', findFleetController());
  router.get('/:id', findOneFleetController());
  router.delete('/:id', deleteFleetController());
  router.put('/:id', updateFleetController());

  inputRouter.use('/fleet', router);
};
