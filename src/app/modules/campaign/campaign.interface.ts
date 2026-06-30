import type { ObjectId } from "mongoose";

export type TCampaign = {
  title: string;
  couponId:ObjectId;
  image: string;
  status: 'active' | 'inactive';
};