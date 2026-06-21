/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { cartService } from "./cart.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from 'http-status-codes';



const createCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart = req.body;
    const result = await cartService.createCart(cart);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'cart Created Successfully',
      data: result,
    });
  },
);



const getAllCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await cartService.getAllCart(
      query as Record<string, string>,
    );

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all cart successfully',
      data: result,
    });
  },
);



const getAllCartByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
   const result = await cartService.getAllCartByUser(userId as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all cart user successfully',
      data: result,
    });
  },
);


const updateSingleCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateCart = req.body;

  const result = await cartService.updateSingleCart(id as string, {
    ...updateCart,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'cart Updated Successfully',
    data: result,
  });
});


const deleteSingleCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await cartService.deleteSingleCart(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single color successfully',
      data: result,
    });
  },
);

export const cartController = {
  createCart,
  getAllCart,
  updateSingleCart,
  deleteSingleCart,
  getAllCartByUser
};
