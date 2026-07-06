import type { Types } from "mongoose";


export type StockStatus = 'in_stock' | 'out_of_stock' | 'pre_order';
export type ProductLabel =
  | 'New'
  | 'Trending'
  | 'Limited Stock'
  | 'Featured'
  | 'Best Sellers';

export type TSpecification = {
  key: string;
  value: string;
};

export type TInventory = {
  color?: string;
  colorName?: string;
  size?: string;
  quantity: number;
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

  category: Types.ObjectId;
  subCategory?: Types.ObjectId;
  brand?: Types.ObjectId;

  // colors?: Types.ObjectId[];
  // sizes?: Types.ObjectId[];

  thumbnailImage: string;
  backviewImage?: string;
  images: string[];

  freeShipping?: boolean;

  sku?: string;
  barcode?: string;

  stock_status?: StockStatus;

  inventoryType?: string;
  inventories?: TInventory[];

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
