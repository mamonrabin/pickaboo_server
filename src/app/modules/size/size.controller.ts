/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { sizeService } from './size.service.js';

const createSize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = req.body;
    const result = await sizeService.createSize(category);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'size Created Successfully',
      data: result,
    });
  },
);

const getAllSize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await sizeService.getAllSize(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all size successfully',
      data: result,
    });
  },
);

const getSingleSize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await sizeService.getSingleSize(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single size successfully',
      data: result,
    });
  },
);

const getSingleSizeBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await sizeService.getSingleSizeBySlug(slug as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'get single size by slug successfully',
      data: result,
    });
  },
);

const updateSingleSize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateSize = req.body;

  const result = await sizeService.updateSingleSize(id as string, {
    ...updateSize,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'size Updated Successfully',
    data: result,
  });
});

const deleteSingleSize = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await sizeService.deleteSingleSize(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single size successfully',
      data: result,
    });
  },
);

export const sizeController = {
  createSize,
  getAllSize,
  getSingleSize,
  getSingleSizeBySlug,
  updateSingleSize,
  deleteSingleSize,
};
