import express from 'express';
import { socialIconController } from './social.controller.js';


const router = express.Router();

router.post('/create-socialIcon', socialIconController.createSocialIcon);
router.get('/', socialIconController.getAllSocialIcon);

router.put('/:id', socialIconController.updateSingleSocialIcon);
router.delete('/:id', socialIconController.deleteSingleSocialIcon);

export const socialIconRoutes = router;
