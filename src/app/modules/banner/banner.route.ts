import express from 'express';
import upload from '../../utils/ImgUploder.js';
import { categoryController } from './banner.controller.js';

const router = express.Router();

router.post(
  '/create-category',
  upload.single('image'),
  categoryController.createCategory,
);
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getSingleCategory);
router.get('/categorySlug/:slug', categoryController.getSingleCategoryBySlug);
router.put(
  '/:id',
  upload.single('image'),
  categoryController.updateSingleCategory,
);
router.delete('/:id', categoryController.deleteSingleCategory);

export const categoryRoutes = router;
