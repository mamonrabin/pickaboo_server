import express from 'express';
import { returnController } from './return.controller.js';


const router = express.Router();

router.post('/create-return', returnController.createReturn);
router.get('/', returnController.getReturn);
router.get('/', returnController.getAllReturn);
router.get('/:id', returnController.getSingleReturn);
router.patch('/:id', returnController.updateSingleReturn);

router.delete('/:id', returnController.deleteSingleReturn);

export const returnRoutes = router;
