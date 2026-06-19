/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { subcategoryService } from './sub-category.service.js';

const createSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const result = await subcategoryService.createSubCategor({
      ...subcategory,
      image: imageUrl,
    });

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Sub-category created Successfully',
      data: result,
    });
  },
);

const getAllSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await subcategoryService.getAllSubCategory(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all sub-category successfully',
      data: result,
    });
  },
);

const getSingleSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await subcategoryService.getSingleSubCategory(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single sub-category successfully',
      data: result,
    });
  },
);

const getSingleSubCategoryBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await subcategoryService.getSingleSubCategoryBySlug(
      slug as string,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'get single sub-category by slug successfully',
      data: result,
    });
  },
);

const updateSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateSubCategory = req.body;

  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : updateSubCategory.image;

  const result = await subcategoryService.updateSingleSubCategory(id as string, {
    ...updateSubCategory,
    image: imageUrl,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Sub-Category Updated Successfully',
    data: result,
  });
});


const deleteSingleSubCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await subcategoryService.deleteSingleSubCategory(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single sub-category successfully',
      data: result,
    });
  },
);

export const subcategoryController = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  getSingleSubCategoryBySlug,
  updateSingleSubCategory,
  deleteSingleSubCategory
};
