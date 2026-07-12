import type { ObjectId } from 'mongoose';

export type BannerType = 'Main' | 'Offer' | 'Promotion';

export type TBanner = {
  title?: string;
  description?: string;
  category?: ObjectId;
  link?: string;
  image: string;
  type: BannerType;
};
