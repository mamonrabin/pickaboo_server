/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { logoService } from './logo.service.js';

const createLogo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as any;
    const logo = req.body;

    const headerLogo = files?.headerLogo?.[0]?.filename;
    const footerLogo = files?.footerLogo?.[0]?.filename;

    const result = await logoService.createLogo({
      ...logo,
      headerLogo: headerLogo ? `/uploads/${headerLogo}` : '',
      footerLogo: footerLogo ? `/uploads/${footerLogo}` : '',
    });

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'logo Created Successfully',
      data: result,
    });
  },
);

const getAllLogo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await logoService.getAllLogo();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all logo successfully',
      data: result,
    });
  },
);

const updateSingleLogo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateLogo = req.body;

  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  // Handle updated images if any are uploaded
  const headerLogo = files?.headerLogo?.[0]?.filename;
  const footerLogo = files?.footerLogo?.[0]?.filename;

  const result = await logoService.updateSingleLogo(id as string, {
    ...updateLogo,
    ...(headerLogo && { backviewImage: `/uploads/${headerLogo}` }),
    ...(footerLogo && { backviewImage: `/uploads/${footerLogo}` }),
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'logo Updated Successfully',
    data: result,
  });
});

const deleteSingleLogo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await logoService.deleteSingleLogo(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single logo successfully',
      data: result,
    });
  },
);

export const logoController = {
  createLogo,
  getAllLogo,
  updateSingleLogo,
  deleteSingleLogo,
};
