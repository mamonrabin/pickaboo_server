import { model, Schema } from 'mongoose';
import type { TLogo } from './logo.interface.js';

const logoSchema = new Schema<TLogo>(
  {
    headerLogo: { type: String, required: true },
    footerLogo: { type: String },
    description: { type: String },
    address: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
    email: { type: String },
    type: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
  },
  {
    timestamps: true,
  },
);

export const logoModel = model<TLogo>('logo', logoSchema);
