/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";

import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from 'http-status-codes';
import { courierService } from "./courier.service.js";


const createSteadfastParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const result =
      await courierService.createSteadfastParcel(
        orderId as string,
      );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Parcel created successfully',
      data: result,
    });
  },
);


const trackSteadfastParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { consignmentId } = req.params;

    const result =
      await courierService.trackSteadfastParcel(
        consignmentId as string,
      );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Tracking fetched successfully',
      data: result,
    });
  },
);


// const cancelSteadfastParcel = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { consignmentId } = req.params;

//     const result =
//       await courierService.cancelSteadfastParcel(
//         consignmentId as string,
//       );

//     return sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: 'Parcel cancelled successfully',
//       data: result,
//     });
//   },
// );


export const courierController = {
  createSteadfastParcel,
  trackSteadfastParcel
};