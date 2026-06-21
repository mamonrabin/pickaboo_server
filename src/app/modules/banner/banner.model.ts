import { model, Schema } from 'mongoose';
import type { TBanner } from './banner.interface.js';

const bannerSchema = new Schema<TBanner>(
  {
    title: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    link: { type: String },
    image: { type: String, required: true },

    type: {
      type: String,
      enum: ['photo', 'photowithdescription'],
      default: 'photo',
    },
  },
  {
    timestamps: true,
  },
);

export const bannerModel = model<TBanner>('banner', bannerSchema);
