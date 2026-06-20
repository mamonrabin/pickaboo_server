import express from 'express';
import { colorController } from './color.controller.js';



const router = express.Router();

router.post(
  '/create-color',
  colorController.createColor,
);
router.get('/', colorController.getAllColor);
router.get('/:id', colorController.getSingleColor);
router.get('/colorSlug/:slug', colorController.getSingleColorBySlug);
router.put(
  '/:id',
  colorController.updateSingleColor,
);
router.delete('/:id', colorController.deleteSingleColor);

export const colorRoutes = router;
