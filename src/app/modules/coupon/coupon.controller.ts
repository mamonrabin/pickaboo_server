/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { couponService } from './coupon.service.js';

const createCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupon = req.body;

    const result = await couponService.createCoupon(coupon);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'coupon Created Successfully',
      data: result,
    });
  },
);

const getAllCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await couponService.getAllCoupon();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all coupon successfully',
      data: result,
    });
  },
);

const getAllCouponByFilter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await couponService.getAllCouponByFilter(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all coupon by filter successfully',
      data: result,
    });
  },
);

const getSingleCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await couponService.getSingleCoupon(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single coupon successfully',
      data: result,
    });
  },
);
const getCouponByCode = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.params;
    const result = await couponService.getSingleCoupon(code as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single coupon by code successfully',
      data: result,
    });
  },
);

const updateSingleCoupon = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateCoupon = req.body;

  const result = await couponService.updateSingleCoupon(
    id as string,
    updateCoupon,
  );

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'coupon Updated Successfully',
    data: result,
  });
});

const deleteSingleCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await couponService.deleteSingleCoupon(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single coupon successfully',
      data: result,
    });
  },
);

export const couponController = {
  createCoupon,
  getAllCoupon,
  getAllCouponByFilter,
  getSingleCoupon,
  getCouponByCode,
  updateSingleCoupon,
  deleteSingleCoupon,
};
