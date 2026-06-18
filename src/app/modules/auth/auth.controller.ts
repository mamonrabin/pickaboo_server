/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { authServices } from './auth.service.js';
import { setAuthCookie } from '../../utils/setCookie.js';
import type { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse.js';
import { catchAsync } from '../../utils/catchAsync.js';
import type { JwtPayload } from 'jsonwebtoken';

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = req.body;

    const result = await authServices.loginUser(loginInfo);

    setAuthCookie(res, {
      accessToken: result.accessToken,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Login successful',
      data: result,
    });
  },
);

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
    })
})


const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    await authServices.resetPassword(req.body, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})


const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const { email } = req.body;

    await authServices.forgotPassword(email);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Email Sent Successfully",
        data: null,
    })
})


export const authControllers = {
  credentialsLogin,
  logout,
  resetPassword,
  forgotPassword
};
