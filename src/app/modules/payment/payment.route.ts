import express from 'express';
import { paymentController } from './payment.controller.js';

const router = express.Router();

router.post('/init-payment/:orderId', paymentController.initPayment);

router.post('/success', paymentController.successPayment);

router.post('/fail', paymentController.failPayment);

router.post('/cancel', paymentController.cancelPayment);

export const PaymentRoutes = router;
