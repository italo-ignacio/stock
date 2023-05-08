import { Router } from 'express';
import {
  authenticateAccountController,
  authenticateDriverController
} from '@application/controller/auth';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/account', authenticateAccountController());

  router.post('/driver', authenticateDriverController());

  inputRouter.use('/auth', router);
};
