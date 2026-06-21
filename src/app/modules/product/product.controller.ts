/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync.js';
import { productService } from './product.service.js';
import { sendResponse } from '../../utils/sendResponse.js';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as any;

  const productData = req.body;

  const thumbnail = files?.thumbnailImage?.[0]?.filename;
  const backview = files?.backviewImage?.[0]?.filename;

  const images = files?.images?.map((f: any) => `/uploads/${f.filename}`) || [];

  const result = await productService.createProduct({
    ...productData,
    thumbnailImage: thumbnail ? `/uploads/${thumbnail}` : '',
    backviewImage: backview ? `/uploads/${backview}` : '',
    images,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await productService.getAllProduct(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all product successfully',
      data: result,
    });
  },
);

const getReletiveProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : 8;

    const result = await productService.getRelatedProducts(id as string, limit);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all product successfully',
      data: result,
    });
  },
);

const getSingleProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await productService.getSingleProduct(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single product successfully',
      data: result,
    });
  },
);

const getSingleProductBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await productService.getSingleProductBySlug(slug as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'get single product by slug successfully',
      data: result,
    });
  },
);

const updateSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Handle updated images if any are uploaded
    const thumbnailImage = files?.thumbal_image?.[0]?.filename;
    const backviewImage = files?.backview_image?.[0]?.filename;
    const images =
      files?.images?.map((file) => `/uploads/${file.filename}`) || [];

    const updatedProduct = {
      ...updateData,
      ...(thumbnailImage && { thumbal_image: `/uploads/${thumbnailImage}` }),
      ...(backviewImage && { backview_image: `/uploads/${backviewImage}` }),
      ...(images.length > 0 && { images }),
    };

    const result = await productService.updateSingleProduct(
      id as string,
      updatedProduct,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteSingleProduct(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle product successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getReletiveProduct,
  getSingleProduct,
  getSingleProductBySlug,
  updateSingleProduct,
  deleteSingleProduct,
};
