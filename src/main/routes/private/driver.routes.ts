import { Router } from 'express';
import {
  activeDriverController,
  disableDriverController,
  findDriverController,
  insertDriverController,
  updateDriverController
} from '@application/controller/driver';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertDriverController());
  router.get('', findDriverController());
  router.put('/:id', updateDriverController());
  router.patch('/disable/:id', disableDriverController());
  router.patch('/active/:id', activeDriverController());

  inputRouter.use('/driver', router);
};
