import { model, Schema } from 'mongoose';
import type { TCampaign } from './campaign.interface.js';

const campaignSchema = new Schema<TCampaign>(
  {
    title: { type: String, required:true },
    image: { type: String},
    couponId: { type: Schema.Types.ObjectId, ref: 'coupon',required:true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    timestamps: true,
  },
);

export const campaignModel = model<TCampaign>('campaign', campaignSchema);
