import { Router } from 'express';
import {
  activeClientController,
  disableClientController,
  findClientController,
  insertClientController,
  updateClientController
} from '@application/controller/client';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertClientController());
  router.get('', findClientController());
  router.put('/:id', updateClientController());
  router.patch('/disable/:id', disableClientController());
  router.patch('/active/:id', activeClientController());

  inputRouter.use('/client', router);
};
