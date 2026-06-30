/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import httpStatus from 'http-status-codes';
import { contactService } from './contact.service.js';


const createContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = req.body;

    const result = await contactService.createContact(contact);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'contact Created Successfully',
      data: result,
    });
  },
);

const getAllContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await contactService.getAllContact();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get all contact successfully',
      data: result,
    });
  },
);


const getSingleContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await contactService.getSingleContact(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' get single contact successfully',
      data: result,
    });
  },
);


const deleteSingleContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await contactService.deleteSingleContact(id as string);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' delete single contact successfully',
      data: result,
    });
  },
);

export const contactController = {
  createContact,
  getAllContact,
  getSingleContact,
  deleteSingleContact,
};
