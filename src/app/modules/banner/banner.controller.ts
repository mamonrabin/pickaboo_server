/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';
import { categoryService } from './banner.service.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const result = await categoryService.createCategory({
      ...category,
      image: imageUrl,
    });

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Category Created Successfully',
      data: result,
    });
  },
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await categoryService.getAllCategory(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all category successfully',
      data: result,
    });
  },
);

const getSingleCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await categoryService.getSingleCategory(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single category successfully',
      data: result,
    });
  },
);

const getSingleCategoryBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await categoryService.getSingleCategoryBySlug(
      slug as string,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'get single category by slug successfully',
      data: result,
    });
  },
);

const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateCategory = req.body;

  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : updateCategory.image;

  const result = await categoryService.updateSingleCategory(id as string, {
    ...updateCategory,
    image: imageUrl,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Updated Successfully',
    data: result,
  });
});


const deleteSingleCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await categoryService.deleteSingleCategory(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single category successfully',
      data: result,
    });
  },
);

export const categoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  getSingleCategoryBySlug,
  updateSingleCategory,
  deleteSingleCategory
};
