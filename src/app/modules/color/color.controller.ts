/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { colorService } from './color.service.js';


const createColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const color = req.body;
    const result = await colorService.createColor(color);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'color Created Successfully',
      data: result,
    });
  },
);

const getAllColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await colorService.getAllColor(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all color successfully',
      data: result,
    });
  },
);

const getSingleColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await colorService.getSingleColor(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single color successfully',
      data: result,
    });
  },
);

const getSingleColorBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await colorService.getSingleColorBySlug(slug as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'get single color by slug successfully',
      data: result,
    });
  },
);

const updateSingleColor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateColor = req.body;

  const result = await colorService.updateSingleColor(id as string, {
    ...updateColor,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'color Updated Successfully',
    data: result,
  });
});

const deleteSingleColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await colorService.deleteSingleColor(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single color successfully',
      data: result,
    });
  },
);

export const colorController = {
  createColor,
  getAllColor,
  getSingleColor,
  getSingleColorBySlug,
  updateSingleColor,
  deleteSingleColor,
};
