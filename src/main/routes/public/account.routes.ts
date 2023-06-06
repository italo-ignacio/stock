import { Router } from 'express';
import { insertAccountController } from '@application/controller/account';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertAccountController());

  inputRouter.use('/account', router);
};
