import express from 'express';
import { courierController } from './courier.controller.js';



const router = express.Router();

router.post(
  '/steadfast/:orderId',
  courierController.createSteadfastParcel,
);

router.get(
  '/track/:consignmentId',
  courierController.trackSteadfastParcel,
);

// router.post(
//   '/cancel/:consignmentId',
//   auth(USER_ROLE.ADMIN),
//   CourierController.cancelSteadfastParcel,
// );

export const CourierRoutes = router;