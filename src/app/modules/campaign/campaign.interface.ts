import type { ObjectId } from "mongoose";

export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TCampaign = {
  title: string;
  couponId:ObjectId;
  image?: string;
 status: Status;
}; 