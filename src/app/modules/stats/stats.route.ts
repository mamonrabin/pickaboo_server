import express from 'express';

import { StatsController } from './stats.controller.js';

const router = express.Router();

// router.get('/order', StatsController.getBookingStats);
// router.get('/payment', StatsController.getPaymentStats);
router.get('/user', StatsController.getUserStats);
router.get('/products', StatsController.getProductsStats);
router.get('/order', StatsController.getOrderStats);
router.get('/payment', StatsController.getPaymentStats);
router.get('/dashboard', StatsController.getDashboardStats);

export const StatsRoutes = router;
