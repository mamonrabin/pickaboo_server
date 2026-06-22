import { model, Schema } from 'mongoose';
import type { TOrder } from './order.interface.js';
import orderIdGenerate from '../../utils/orderIdGenerate.js';


const orderSchema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },

    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      index: true,
    },

    products: [
      {
        productRef: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        color: { type: String },
        size: { type: String },
      },
    ],

    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      altPhone: { type: String },
      email: { type: String },
      city: { type: String, required: true },
      address: { type: String, required: true },
      house: { type: String },
      road: { type: String },
      thana: { type: String },
    },

    subTotalPrice: {
      type: Number,
      required: true,
    },

    shippingCost: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    couponRef: {
      type: Schema.Types.ObjectId,
      ref: 'coupon',
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'CARD', 'STRIPE', 'BKASH', 'NAGAD'],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['UNPAID', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'UNPAID',
    },

    status: {
      type: String,
      enum: [
        'PENDING',
        'CONFIRMED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'ON_HOLD',
        'IN_REVIEW',
        'RETURNED',
      ],
      default: 'PENDING',
    },

    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);


orderSchema.pre('save', function () {
  if (!this.orderId) {
    this.orderId = orderIdGenerate('ORD-');
  }
});


orderSchema.index({ userRef: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });

export const orderModel = model<TOrder>('order', orderSchema);
