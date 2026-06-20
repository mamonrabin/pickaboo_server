import type { ObjectId } from 'mongoose';

export type StockStatus = 'in_stock' | 'out_of_stock' | 'pre_order';
export type ProductLabel =
  | 'New'
  | 'Trending'
  | 'Limited Stock'
  | 'Sale'
  | 'Featured';

export type TSpecification = {
  key: string;
  value: string;
};

export type TProduct = {
  title: string;
  slug?: string;
  quantity: number;
  mrpPrice: number;
  price?: number;
  discount?: number;
  soldQuantity?: number;

  description: string;

  category: ObjectId;
  subCategory?: ObjectId;
  brand: ObjectId;

  colors: ObjectId[];
  sizes: ObjectId[];

  thumbnailImage: string;
  backviewImage?: string;
  images: string[];

  freeShipping?: boolean;

  sku?: string;
  barcode?: string;

  stock_status?: StockStatus;

  video_url?: string;

  labels?: ProductLabel;

  tags?: string[];

  specifications?: TSpecification[];

  averageRating?: number;
  totalReviews?: number;

  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];

  warranty?: string;
};
