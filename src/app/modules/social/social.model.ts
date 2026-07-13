import { model, Schema } from 'mongoose';
import type { TSocialIcon } from './social.interface.js';

const socialIconSchema = new Schema<TSocialIcon>(
  {
    link: { type: String, required: true },
    type: {
      type: String,
      enum: ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'likie'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const socialIconModel = model<TSocialIcon>(
  'socialIcon',
  socialIconSchema,
);
