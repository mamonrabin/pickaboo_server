/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import { paymentModel } from './payment.model.js';
import AppError from '../../helpers/AppError.js';
import { SSLService } from '../sslCommerz/sslCommerz.service.js';
import { orderModel } from '../order/order.model.js';
import { PAYMENT_STATUS } from './payment.interface.js';

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





export const paymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment
};
