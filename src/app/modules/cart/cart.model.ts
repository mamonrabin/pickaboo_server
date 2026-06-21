import { model, Schema } from 'mongoose';
import type { TCart } from './cart.interface.js';

const cartSchema = new Schema<TCart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    products: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    color: { type: String },
    size: { type: String },
    quantity: { type: Number, required: true },
    
  },
  {
    timestamps: true,
  },
);

export const cartModel = model<TCart>('cart', cartSchema);
