import { model, Schema } from 'mongoose';
import type { TSocialIcon } from './social.interface.js';

const socialIconSchema = new Schema<TSocialIcon>(
  {
    link: { type: String, required: true },

    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const socialIconModel = model<TSocialIcon>(
  'socialIcon',
  socialIconSchema,
);
