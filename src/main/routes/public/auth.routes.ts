import { Router } from 'express';
import {
  authenticateAccountController,
  authenticateDriverController
} from '@application/controller/auth';
import { refreshTokenController } from '@application/controller/auth/refresh';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('/account', authenticateAccountController());

  router.post('/driver', authenticateDriverController());

  router.post('/refresh-token', refreshTokenController());

  inputRouter.use('/auth', router);
};
