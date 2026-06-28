import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { paymentService } from "./payment.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import config from "../../config/index.js";

type PaymentResult = {
    success: boolean;
    message?: string;
    amount?: string;
    status?: string;
};

const initPayment = catchAsync(async (req: Request, res: Response) => {
    const bookingId = req.params.orderId;
    const result = await paymentService.initPayment(bookingId as string)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Payment done successfully",
        data: result,
    });
});
const successPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    
    const result = await paymentService.successPayment(query as Record<string, string>) as PaymentResult

    if (result.success) {
        res.redirect(`${config.ssl_success_frontend_url as string}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await paymentService.failPayment(query as Record<string, string>) as PaymentResult

    if (result.success) {
        res.redirect(`${config.ssl_fail_frontend_url as string}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
});
const cancelPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await paymentService.cancelPayment(query as Record<string, string>) as PaymentResult

    if (result.success) {
        res.redirect(`${config.ssl_cancel_frontend_url as string}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
});


const getInvoiceDownloadUrl = catchAsync(
    async (req: Request, res: Response) => {
        const { paymentId } = req.params;
        const result = await paymentService.getInvoiceDownloadUrl(paymentId as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Invoice download URL retrieved successfully",
            data: result,
        });
    }
);


export const paymentController = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    getInvoiceDownloadUrl
};
