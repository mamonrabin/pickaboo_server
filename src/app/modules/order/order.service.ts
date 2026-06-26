/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import type { TOrder } from './order.interface.js';
import { orderModel } from './order.model.js';
import { productModel } from '../product/product.model.js';
import { QueryBuilder } from '../../utils/QueryBuilder.js';
import { orderSearchableFields } from './order.constant.js';
import { PAYMENT_STATUS } from '../payment/payment.interface.js';
import { SSLService } from '../sslCommerz/sslCommerz.service.js';
import { paymentModel } from '../payment/payment.model.js';



const createOrder = async (order: TOrder) => {
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    // Create order
    const [createdOrder] = await orderModel.create([order], {
      session,
    });

    // Update stock
    for (const item of order.products) {
      const product = await productModel
        .findById(item.productRef)
        .session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productRef}`);
      }

      const availableQty =
        (product.quantity || 0) - (product.soldQuantity || 0);

      if (availableQty < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.title}`);
      }

      product.soldQuantity =
        (product.soldQuantity || 0) + item.quantity;

      await product.save({ session });
    }

    // Ensure createdOrder exists
    if (!createdOrder) {
      throw new Error('Failed to create order');
    }

    // Create payment
    const [payment] = await paymentModel.create(
      [
        {
          order: createdOrder._id,
          transactionId: `TXN-${Date.now()}`,
          status: PAYMENT_STATUS.UNPAID,
          amount: (createdOrder as any).totalPrice,
        },
      ],
      { session }
    );

     const sslPayload: any = {
      address:order?.shippingAddress?.address,
      email: order?.shippingAddress?.email,
      phoneNumber: order?.shippingAddress?.email,
      name: order?.shippingAddress?.name,
      amount: order?.totalPrice,
      transactionId: payment?.transactionId,
    };


    const sslPayment = await SSLService.sslPaymentInit(sslPayload)

    await session.commitTransaction();

    // return createdOrder;

    return {
      paymentUrl: sslPayment.GatewayPageURL,
      createdOrder
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getAllOrder = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(orderModel.find(), query);
  const colorData = queryBuilder
    .filter()
    .search(orderSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    colorData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};


const getSingleOrder = async (id: string) => {
  const result = await orderModel.findById(id);
  return result;
};



const updateSingleOrder = async (id: string, updateOrder: TOrder) => {
  const result = await orderModel.findByIdAndUpdate(id, updateOrder, {
    new: true,
  });
  return result;
};

const deleteSingleOrder = async (id: string) => {
  const result = await orderModel.findByIdAndDelete(id);
  return result;
};

export const orderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
};
