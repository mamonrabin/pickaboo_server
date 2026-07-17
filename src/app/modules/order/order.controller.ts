/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync.js';
import { orderService } from './order.service.js';
import { sendResponse } from '../../utils/sendResponse.js';
import type { NextFunction, Request, Response } from 'express';

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;
    const result = await orderService.createOrder(order);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'order Created Successfully',
      data: result,
    });
  },
);

const getTodayOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await orderService.getTodayOrders(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all today order successfully',
      data: result,
    });
  },
);
const getAllOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await orderService.getAllOrder(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all order successfully',
      data: result,
    });
  },
);

const getSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await orderService.getSingleOrder(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single order successfully',
      data: result,
    });
  },
);

const updateSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateOrder = req.body;
    const result = await orderService.updateSingleOrder(
      id as string,
      updateOrder,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'update single order successfully',
      data: result,
    });
  },
);

const deleteSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await orderService.deleteSingleOrder(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'deiete single order successfully',
      data: result,
    });
  },
);

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getTodayOrders
};
