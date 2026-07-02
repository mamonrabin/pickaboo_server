import type { ObjectId } from 'mongoose';

export type BannerType = 'photo' | 'photowithdescription' | 'offerbanner' | "productbanner";

export type TBanner = {
  title?: string;
  description?: string;
  category?: ObjectId;
  link?: string;
  image: string;
  type: BannerType;
};
