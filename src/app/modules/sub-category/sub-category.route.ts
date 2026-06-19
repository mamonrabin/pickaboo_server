import express from 'express';
import upload from '../../utils/ImgUploder.js';
import { subcategoryController } from './sub-category.controller.js';


const router = express.Router();

router.post(
  '/create-subcategory',
  upload.single('image'),
  subcategoryController.createSubCategory,
);
router.get('/', subcategoryController.getAllSubCategory);
router.get('/:id', subcategoryController.getSingleSubCategory);
router.get('/subcategorySlug/:slug', subcategoryController.getSingleSubCategoryBySlug);
router.put(
  '/:id',
  upload.single('image'),
  subcategoryController.updateSingleSubCategory,
);
router.delete('/:id', subcategoryController.deleteSingleSubCategory);

export const subcategoryRoutes = router;
