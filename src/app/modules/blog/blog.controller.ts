/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { blogService } from './blog.service.js';



const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const result = await blogService.createBlog({
      ...blog,
      image: imageUrl,
    });

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'blog Created Successfully',
      data: result,
    });
  },
);

const getAllBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await blogService.getAllBlog();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all blog successfully',
      data: result,
    });
  },
);


const getSingleBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await blogService.getSingleBlog(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'get single blog successfully',
      data: result,
    });
  },
);




const updateSingleBlog= catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateBlog = req.body;

  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : updateBlog.image;

  const result = await blogService.updateSingleBlog(id as string, {
    ...updateBlog,
    image: imageUrl,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'blog Updated Successfully',
    data: result,
  });
});


const deleteSingleBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await blogService.deleteSingleBlog(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single blog successfully',
      data: result,
    });
  },
);

export const blogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog
};
