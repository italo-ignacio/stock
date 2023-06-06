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

  router.post('/account/recover-password', (req, res) => {
    res.json({
      message: 'route in progress'
    });
  });

  router.post('/driver/recover-password', (req, res) => {
    res.json({
      message: 'route in progress'
    });
  });

  inputRouter.use('/auth', router);
};
