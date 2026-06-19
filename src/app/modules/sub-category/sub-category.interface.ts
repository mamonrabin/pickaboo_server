import type { ObjectId } from "mongoose";

export type TSubCategory = {
  category: ObjectId;
  subcategoryName: string;
  slug: string;
  image: string;
};
