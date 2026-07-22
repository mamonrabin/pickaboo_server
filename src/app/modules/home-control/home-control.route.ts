import express from 'express';
import { homeController } from './home-control.controller.js';



const router = express.Router();

router.post('/create-home-controll', homeController.createHome);
router.get('/', homeController.getAllHome);
router.get('/:id', homeController.getSingleHome);
router.patch('/:id', homeController.updateSingleHome);

router.delete('/:id', homeController.deleteSingleHome);

export const homeRoutes = router;
