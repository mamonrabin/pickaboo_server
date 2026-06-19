import express from 'express';
import { sizeController } from './size.controller.js';


const router = express.Router();

router.post(
  '/create-size',
  sizeController.createSize,
);
router.get('/', sizeController.getAllSize);
router.get('/:id', sizeController.getSingleSize);
router.get('/sizeSlug/:slug', sizeController.getSingleSizeBySlug);
router.put(
  '/:id',
  sizeController.updateSingleSize,
);
router.delete('/:id', sizeController.deleteSingleSize);

export const sizeRoutes = router;
