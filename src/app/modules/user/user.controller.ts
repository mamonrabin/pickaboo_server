/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js"
import { userServices } from "./user.service.js"
import { sendResponse } from "../../utils/sendResponse.js"

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})

export const userControllers = {
    createUser,
  
}