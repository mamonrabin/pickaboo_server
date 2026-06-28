import express from 'express';
import { aboutController } from './about.controller.js';

const router = express.Router();

router.post('/create-about', aboutController.createAbout);
router.get('/', aboutController.getAllAbout);

router.put('/:id', aboutController.updateSingleAbout);
router.delete('/:id', aboutController.deleteSingleAbout);

export const aboutRoutes = router;
