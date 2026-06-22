import express from 'express';
import { orderController } from './order.controller.js';


const router = express.Router();

router.post(
  '/create-order',
  orderController.createOrder,
);
router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getSingleOrder);
router.put('/:id', orderController.updateSingleOrder);
router.delete('/:id', orderController.deleteSingleOrder);

export const orderRoutes = router;
