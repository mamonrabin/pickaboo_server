import express from 'express';
import { cartController } from './cart.controller.js';


const router = express.Router();

router.post('/create-cart', cartController.createCart);
router.get('/', cartController.getAllCart);
router.get('/user/:userId', cartController.getAllCartByUser);
router.put('/:id', cartController.updateSingleCart);
router.delete('/:id', cartController.deleteSingleCart);

export const cartRoutes = router;
