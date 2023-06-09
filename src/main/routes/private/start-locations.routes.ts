import { Router } from 'express';
import { findStartLocationsController } from '@application/controller/account';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findStartLocationsController());

  inputRouter.use('/start-locations', router);
};
