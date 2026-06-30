import type { ObjectId } from "mongoose"

export type TWishlist = {
  userRef: ObjectId;
  productRef: ObjectId[];
}
