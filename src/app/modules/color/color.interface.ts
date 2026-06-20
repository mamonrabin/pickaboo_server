import type { ObjectId } from "mongoose";


export type TColor = {
  colorName: string;
  colorCode: string;
  size: ObjectId;
  slug: string;
};
