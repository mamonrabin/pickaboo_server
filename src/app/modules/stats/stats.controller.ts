// controllers/stats.controller.ts

import type { Request, Response } from "express";

import { StatsService } from "./stats.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";



// const getBookingStats = catchAsync(async (req: Request, res: Response) => {
//     const stats = await StatsService.getBookingStats();
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Booking stats fetched successfully",
//         data: stats,
//     });
// });



const getUserStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getUserStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User stats fetched successfully",
        data: stats,
    });
});

const getProductsStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getProductStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "products stats fetched successfully",
        data: stats,
    });
});

const getOrderStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getOrderStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "order stats fetched successfully",
        data: stats,
    });
});

const getPaymentStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getPaymentStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment stats fetched successfully",
        data: stats,
    });
});
const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await StatsService.getDashboardStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "dashboard stats fetched successfully",
        data: stats,
    });
});

export const StatsController = {
    getOrderStats,
    getPaymentStats,
    getUserStats,
    getProductsStats,
    getDashboardStats
};