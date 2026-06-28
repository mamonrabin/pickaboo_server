/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import { paymentModel } from './payment.model.js';
import AppError from '../../helpers/AppError.js';
import { SSLService } from '../sslCommerz/sslCommerz.service.js';
import { orderModel } from '../order/order.model.js';
import { PAYMENT_STATUS } from './payment.interface.js';
import { generatePdf } from '../../utils/invoice.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { uploadBufferToCloudinary } from '../../config/cloudinary.config.js';
// import { generatePdf } from '../../utils/invoice.js';

const initPayment = async (orderId: string) => {
  const payment = await paymentModel.findOne({
    order: orderId,
  });

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const populatedPayment = await payment.populate('order');
  const order = populatedPayment.order as any;

  const sslPayload = {
    name: order.shippingAddress.name,
    email: order.shippingAddress.email || 'customer@gmail.com',
    phoneNumber: order.shippingAddress.phone,
    address: order.shippingAddress.address,
    amount: payment.amount,
    transactionId: payment.transactionId,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};





const successPayment = async (query: Record<string, string>) => {
  const session = await paymentModel.startSession();

  try {
    session.startTransaction();

    const { transactionId } = query;


    if (!transactionId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'transactionId is required');
    }

    const payment = await paymentModel.findOne({
      transactionId,
    });


    if (!payment) {
      throw new Error('Payment not found');
    }

    await SSLService.validatePayment(query);

    payment.status = PAYMENT_STATUS.PAID;

    await payment.save({ session });

    await orderModel.findByIdAndUpdate(
      payment.order,
      {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
      { session },
    );

    // prepare invoice data
    const orderDoc: any = await orderModel.findById(payment.order);

    const invoiceData: any = {
      transactionId: payment.transactionId as string,
      orderDate: orderDoc?.createdAt || new Date(),
      userName: orderDoc?.shippingAddress?.name || '',
      phone: orderDoc?.shippingAddress?.phone || '',
      productName: orderDoc?.items?.[0]?.name || '',
      totalAmount: payment.amount || 0,
    };

    const pdfBuffer = await generatePdf(invoiceData);


    const cloudinaryResult = await uploadBufferToCloudinary(pdfBuffer, "invoice")

        if (!cloudinaryResult) {
            throw new AppError(401, "Error uploading pdf")
        }

        await paymentModel.findByIdAndUpdate(payment._id, 
          { invoiceUrl: cloudinaryResult.secure_url }, 
          { runValidators: true, session })


    const recipientEmail = orderDoc?.shippingAddress?.email || 'customer@gmail.com';

    console.log("send email",recipientEmail)

    await sendEmail({
      to: recipientEmail,
      subject: 'Your Order Invoice',
      templateName: 'invoice',
      templateData: invoiceData,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    await session.commitTransaction();

    return {
      success: true,
      message: 'Payment Successful',
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};


const failPayment = async (query: Record<string, string>) => {
  const session = await paymentModel.startSession();

  try {
    session.startTransaction();

    const { transactionId } = query;


    if (!transactionId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'transactionId is required');
    }

    const payment = await paymentModel.findOne({
      transactionId,
    });


    if (!payment) {
      throw new Error('Payment not found');
    }

    await SSLService.validatePayment(query);

    payment.status = PAYMENT_STATUS.FAILED;

    await payment.save({ session });

    await orderModel.findByIdAndUpdate(
      payment.order,
      {
        paymentStatus: 'FAILED',
        status: 'FAILED',
      },
      { session },
    );

    await session.commitTransaction();

    return {
      success: true,
      message: 'Payment failed',
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};


const cancelPayment = async (query: Record<string, string>) => {
  const session = await paymentModel.startSession();

  try {
    session.startTransaction();

    const { transactionId } = query;


    if (!transactionId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'transactionId is required');
    }

    const payment = await paymentModel.findOne({
      transactionId,
    });


    if (!payment) {
      throw new Error('Payment not found');
    }

    await SSLService.validatePayment(query);

    payment.status = PAYMENT_STATUS.CANCELLED;

    await payment.save({ session });

    await orderModel.findByIdAndUpdate(
      payment.order,
      {
        paymentStatus: 'CANCELLED',
        status: 'CANCELLED',
      },
      { session },
    );

    await session.commitTransaction();

    return {
      success: true,
      message: 'Payment cancelled',
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getInvoiceDownloadUrl = async (paymentId: string) => {
    const payment = await paymentModel.findById(paymentId)
        .select("invoiceUrl")

    if (!payment) {
        throw new AppError(401, "Payment not found")
    }

    if (!payment.invoiceUrl) {
        throw new AppError(401, "No invoice found")
    }

    return payment.invoiceUrl
};



export const paymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  getInvoiceDownloadUrl
};
