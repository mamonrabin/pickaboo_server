import express from 'express';
import upload from '../../utils/ImgUploder.js';
import { brandController } from './brand.controller.js';


const router = express.Router();

router.post(
  '/create-brand',
  upload.single('image'),
  brandController.createBrand,
);
router.get('/', brandController.getAllBrand);
router.get('/:id', brandController.getSingleBrand);
router.get('/brandSlug/:slug', brandController.getSingleBrandBySlug);
router.put(
  '/:id',
  upload.single('image'),
  brandController.updateSingleBrand,
);
router.delete('/:id', brandController.deleteSingleBrand);

export const brandRoutes = router;
