import { Router } from 'express';
import {
  deleteAccountController,
  findAccountController,
  updateAccountController
} from '@application/controller/account';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('', findAccountController());
  router.delete('', deleteAccountController());
  router.put('', updateAccountController());

  inputRouter.use('/account', router);
};
