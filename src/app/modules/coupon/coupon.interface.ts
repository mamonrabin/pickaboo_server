import type { ObjectId } from 'mongoose';
export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}

export type TCoupon = {
  code: string;
  discountType: 'Percentage' | 'flat';
  discount: number;
  useLimit: number;
  startDate: Date;
  expireDate: Date;
  couponType: 'brand' | 'category' | 'subCategory';
  used?: number;
  perUserLimit?: number;
  userInfo?: ObjectId;
  categoryID?: ObjectId;
  subCategoryID?: ObjectId;
  brandID?: ObjectId;
  isActive: boolean;
  status: Status;
};
