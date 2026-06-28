import { model, Schema } from 'mongoose';
import type { TPolicy } from './policy.interface.js';


const policySchema = new Schema<TPolicy>(
  {
    title: { type: String,required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['privacy', 'condition', 'return', 'order', 'shipping'],
      default: 'privacy',
    },
  },
  {
    timestamps: true,
  },
);

export const policyModel = model<TPolicy>('policy', policySchema);
