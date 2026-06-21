import { QueryBuilder } from '../../utils/QueryBuilder.js';
import { cartSearchableFields } from './cart.constant.js';
import type { TCart } from './cart.interface.js';
import { cartModel } from './cart.model.js';

const createCart = async (cart: TCart) => {
  const result = await cartModel.create(cart);
  return result;
};

const getAllCart = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(cartModel.find(), query);
  const cartData = queryBuilder
    .filter()
    .search(cartSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    cartData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getAllCartByUser = async (userId: string) => {
  const result = await cartModel.find({ userId });
  return result;
};



const updateSingleCart = async (id: string, updateCart: TCart) => {
  const result = await cartModel.findByIdAndUpdate(id, updateCart, {
    new: true,
  });
  return result;
};

const deleteSingleCart = async (id: string) => {
  const result = await cartModel.findByIdAndDelete(id);
  return result;
};

export const cartService = {
  createCart,
  getAllCart,
  getAllCartByUser,
  updateSingleCart,
  deleteSingleCart,
};
