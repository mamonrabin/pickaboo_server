import { model, Schema } from 'mongoose';
import type { TCampaign } from './campaign.interface.js';

const campaignSchema = new Schema<TCampaign>(
  {
    title: { type: String },
    image: { type: String, default: '' },
    couponId: { type: Schema.Types.ObjectId, ref: 'coupon' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    timestamps: true,
  },
);

export const campaignModel = model<TCampaign>('campaign', campaignSchema);
