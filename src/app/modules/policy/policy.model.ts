import { model, Schema } from 'mongoose';
import { Status, type TPolicy } from './policy.interface.js';

const policySchema = new Schema<TPolicy>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['privacy', 'condition', 'return', 'order', 'shipping'],
      required: true,
      default: 'privacy',
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Active,
    },
  },
  {
    timestamps: true,
  },
);

export const policyModel = model<TPolicy>('policy', policySchema);
