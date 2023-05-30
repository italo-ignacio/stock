import { Router } from 'express';
import {
  deleteCostController,
  findCostController,
  findOneCostController,
  insertCostController,
  updateCostController
} from '@application/controller/cost';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertCostController());
  router.get('', findCostController());
  router.get('/:id', findOneCostController());
  router.put('/:id', updateCostController());
  router.delete('/:id', deleteCostController());

  inputRouter.use('/cost', router);
};
