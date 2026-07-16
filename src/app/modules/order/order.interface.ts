import type { ObjectId } from 'mongoose';

export type TOrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'ON_HOLD'
  | 'IN_REVIEW'
  | 'RETURNED';

export type TPaymentMethod = 'COD' | 'CARD' | 'BKASH' | 'NAGAD';

export type TPaymentStatus = 'UNPAID' | 'PAID' | 'FAILED' | 'REFUNDED';

export type TCourierProvider = 'NONE' | 'STEADFAST' | 'PATHAO' | 'REDX';

export type TCourierStatus =
  | 'PENDING'
  | 'PICKUP_REQUESTED'
  | 'PICKED_UP'
  | 'IN_HUB'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'RETURNED'
  | 'CANCELLED';

export type TOrderProduct = {
  productRef: ObjectId;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

export type TShippingAddress = {
  name: string;
  phone: string;
  altPhone?: string;
  email?: string;
  city: string;
  address: string;
  house?: string;
  road?: string;
  thana?: string;
};

export type TCourier = {
  provider: TCourierProvider;
  consignmentId?: string;
  trackingCode?: string;
  status?: TCourierStatus;
  createdAt?: Date;
  updatedAt?: Date;
  response?: Record<string, unknown>;
};

export type TOrder = {
  orderId: string;
  userRef?: ObjectId;
  payment?: ObjectId;
  products: TOrderProduct[];
  shippingAddress: TShippingAddress;
  subTotalPrice: number;
  shippingCost: number;
  discount?: number;
  totalPrice: number;
  couponRef?: ObjectId;
  paymentMethod: TPaymentMethod;
  paymentStatus: TPaymentStatus;
  status: TOrderStatus;
  note?: string;
  courier?: TCourier;
};
