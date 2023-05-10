import { Router } from 'express';
import {
  deleteCostByYearController,
  findCostByYearController,
  findOneCostByYearController,
  insertCostByYearController
} from '@application/controller/cost-by-year';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post('', insertCostByYearController());
  router.get('', findCostByYearController());
  router.get('/:id', findOneCostByYearController());
  router.delete('/:id', deleteCostByYearController());

  inputRouter.use('/cost-by-year', router);
};
