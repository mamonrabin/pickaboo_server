import express from 'express';
import upload from '../../utils/ImgUploder.js';
import { policyController } from './policy.controller.js';

const router = express.Router();

router.post(
  '/create-policy',
  upload.single('image'),
  policyController.createPolicy,
);
router.get('/', policyController.getAllPolicy);
router.get('/', policyController.getAllPolicyByType);

router.put('/:id', upload.single('image'), policyController.updateSinglePolicy);
router.delete('/:id', policyController.deleteSinglePolicy);

export const policyRoutes = router;
