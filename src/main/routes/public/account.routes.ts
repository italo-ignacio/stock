import { Router } from 'express';
import { insertAccountController } from '@application/controller/account';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertAccountController());

  router.post('/recover-password', (req, res) => {
    res.json({
      message: 'route in progress'
    });
  });

  inputRouter.use('/account', router);
};
