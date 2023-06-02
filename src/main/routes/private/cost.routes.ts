import { Router } from 'express';
import {
  deleteCostController,
  findCostController,
  findOneCostController,
  insertCostController,
  updateCostController
} from '@application/controller/cost';
import { handleMulterError, insertImage, uploadOneFileMiddleware } from '@main/middleware/upload';

export default (inputRouter: Router): void => {
  const router = Router();

  router.post(
    '',
    uploadOneFileMiddleware,
    handleMulterError,
    insertImage(),
    insertCostController()
  );
  router.get('', findCostController());
  router.get('/:id', findOneCostController());
  router.put(
    '/:id',
    uploadOneFileMiddleware,
    handleMulterError,
    insertImage(),
    updateCostController()
  );
  router.delete('/:id', deleteCostController());

  inputRouter.use('/cost', router);
};
