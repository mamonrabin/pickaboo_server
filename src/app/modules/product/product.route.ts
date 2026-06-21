import express from 'express';
import upload from '../../utils/ImgUploder.js';
import { productController } from './product.controller.js';

const router = express.Router();

router.post(
  '/create-product',
  upload.fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'backviewImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  productController.createProduct,
);

router.get('/', productController.getAllProduct);
router.get('/related/:id', productController.getReletiveProduct);
router.get('/:id', productController.getSingleProduct);
router.get('/productSlug/:slug', productController.getSingleProductBySlug);
router.put(
  '/:id',
  upload.fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'backviewImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  productController.updateSingleProduct,
);
router.delete('/:id', productController.deleteSingleProduct);

export const productRoutes = router;
