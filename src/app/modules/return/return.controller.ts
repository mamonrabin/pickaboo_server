/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { returnService } from './return.service.js';

const createReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const result = await returnService.createReturn(data);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Return Created Successfully',
      data: result,
    });
  },
);

const getReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await returnService.getReturn();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Get Returns Successfully',
      data: result,
    });
  },
);

const getAllReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await returnService.getAllReturn(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Get All Return Successfully',
      data: result,
    });
  },
);

const getSingleReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await returnService.getSingleReturn(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Get Single Returns Successfully',
      data: result,
    });
  },
);

const deleteSingleReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await returnService.deleteSingleReturn(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'delete sinngle return successfully',
      data: result,
    });
  },
);

const updateSingleReturn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


  const result = await returnService.updateSingleReturn(
    req.params.id as string,
    req.body
  );

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Return Updated Successfully',
    data: result,
  });
});


export const returnController = {
  createReturn,
  getReturn,
  getAllReturn,
  getSingleReturn,
  deleteSingleReturn,
  updateSingleReturn
};
