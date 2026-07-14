import type { ObjectId } from 'mongoose';
export type TReviewType = ' ' | 'pending' | 'approve';

export type TReview = {
  userID: ObjectId;
  productID: ObjectId;
  rating: number;
  comment?: string;
  type?: TReviewType;
};
