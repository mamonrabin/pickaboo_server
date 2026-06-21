import type { ObjectId } from 'mongoose';

export type TCart = {
  user?: ObjectId;
  products: ObjectId;
  color?: string;
  size?: string;
  quantity: number;
};
