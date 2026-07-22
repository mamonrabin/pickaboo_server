/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { homeService } from './home-control.service.js';


const createHome = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const result = await homeService.createHome(data);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Home Created Successfully',
      data: result,
    });
  },
);

const getAllHome = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await homeService.getAllHome();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Get Homes Successfully',
      data: result,
    });
  },
);



const getSingleHome = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await homeService.getSingleHome(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Get Single Homes Successfully',
      data: result,
    });
  },
);

const deleteSingleHome = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await homeService.deleteSingleHome(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'delete sinngle return successfully',
      data: result,
    });
  },
);

const updateSingleHome = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


  const result = await homeService.updateSingleHome(
    req.params.id as string,
    req.body
  );

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Home Updated Successfully',
    data: result,
  });
});


export const homeController = {
  createHome,
  getAllHome,
  getSingleHome,
  deleteSingleHome,
  updateSingleHome
};
