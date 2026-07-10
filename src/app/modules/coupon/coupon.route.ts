import express from "express";
import { couponController } from "./coupon.controller.js";

const router = express.Router();

router.post("/create-coupon", couponController.createCoupon);
router.get("/", couponController.getAllCoupon);
router.get("/pagination", couponController.getAllCouponByFilter);
router.get("/:id", couponController.getSingleCoupon);
router.get("/apply/:code", couponController.getCouponByCode);
router.put("/:id", couponController.updateSingleCoupon);
router.delete("/:id", couponController.deleteSingleCoupon);

export const couponRoutes = router;
