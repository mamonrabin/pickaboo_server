import express from 'express';
import upload from '../../utils/ImgUploder.js';
import { logoController } from './logo.controller.js';

const router = express.Router();

router.post(
  '/create-logo',
  upload.fields([
    { name: 'headerLogo', maxCount: 1 },
    { name: 'footerLogo', maxCount: 1 },
  ]),

  logoController.createLogo,
);

router.get('/', logoController.getAllLogo);

router.put(
  '/:id',
  upload.fields([
    { name: 'headerLogo', maxCount: 1 },
    { name: 'footerLogo', maxCount: 1 },
  ]),
  logoController.updateSingleLogo,
);

router.delete('/:id', logoController.deleteSingleLogo);

export const logoRoutes = router;
