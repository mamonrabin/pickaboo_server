import { model, Schema } from 'mongoose';
import { SocialType, Status, type TSocialIcon } from './social.interface.js';

const socialIconSchema = new Schema<TSocialIcon>(
  {
    link: { type: String, required: true },
    socialType: {
      type: String,
      enum: Object.values(SocialType),
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
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
