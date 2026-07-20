import type { ObjectId } from 'mongoose';
export type TReturnReason = 'Product Defect' | 'Wrong Item' | 'Size Issue' | 'Changed Mind' | 'Other';

export type TReturn = {
  userID: ObjectId;
  productID: ObjectId;
  description?: string;
  reason: TReturnReason;
};
