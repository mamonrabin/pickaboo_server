import express from 'express';
import { contactController } from './contact.controller.js';

const router = express.Router();

router.post('/create-contact', contactController.createContact);
router.get('/', contactController.getAllContact);
router.get('/:id', contactController.getSingleContact);
router.delete('/:id', contactController.deleteSingleContact);

export const contactRoutes = router;
