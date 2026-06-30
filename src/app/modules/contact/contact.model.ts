import { model, Schema } from 'mongoose';
import type { TContact } from './contact.interface.js';

const contactSchema = new Schema<TContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const contactModel = model<TContact>('contact', contactSchema);
