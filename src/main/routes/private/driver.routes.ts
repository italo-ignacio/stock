import { Router } from 'express';
import { findDriverController, insertDriverController } from '@application/controller/driver';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertDriverController());
  router.get('', findDriverController());

  inputRouter.use('/driver', router);
};
