import { model, Schema } from 'mongoose';
import { Status, type TBanner } from './banner.interface.js';

const bannerSchema = new Schema<TBanner>(
  {
    title: { type: String },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    link: { type: String },
    image: { type: String, required: true },

    type: {
      type: String,
      enum: ['Main', 'Offer','Promotion'],
      default: 'Main',
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

export const bannerModel = model<TBanner>('banner', bannerSchema);
