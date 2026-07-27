import type { ObjectId } from 'mongoose';
export enum Status {
  Active = 'Active',
  InActive = 'InActive',
}
export type TSubCategory = {
  category: ObjectId;
  subcategoryName: string;
  slug: string;
  image: string;
  status: Status;
};
