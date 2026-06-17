/* eslint-disable @typescript-eslint/no-unused-vars */


import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import type { NextFunction, Request, Response } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_acess_token_secret as string);

    if (typeof decoded === "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = decoded as JwtPayload;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};