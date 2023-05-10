import { Router } from 'express';
import {
  deleteWorkController,
  findOneWorkController,
  findWorkController,
  insertWorkController,
  updateWorkController
} from '@application/controller/work';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertWorkController());
  router.get('', findWorkController());
  router.get('/:id', findOneWorkController());
  router.put('/:id', updateWorkController());
  router.delete('/:id', deleteWorkController());

  inputRouter.use('/work', router);
};
