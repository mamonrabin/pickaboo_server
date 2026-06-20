import { productModel } from './product.model.js';
import type { TProduct } from './product.interface.js';
import { QueryBuilder } from '../../utils/QueryBuilder.js';
import { productSearchableFields } from './product.constant.js';

const createProduct = async (payload: TProduct) => {
  const result = await productModel.create(payload);
  return result;
};

const getAllProduct = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    productModel
      .find()
      .populate('category subCategory brand sizes')
      .populate("category","categoryName")
      .populate("sizes","title")
      .populate({
        path: 'colors',
        populate: {
          path: 'size',
        },
      }),
    query,
  );
  const productData = queryBuilder
    .filter()
    .search(productSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    productData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};


const getSingleProduct = async (id: string) => {
  const result = await productModel.findById(id);
  return result;
};

const getSingleProductBySlug = async (slug: string) => {
  const result = await productModel.findOne({ slug });
  return result;
};


const updateSingleProduct = async (id: string, updateProduct: TProduct) => {
  const result = await productModel.findByIdAndUpdate(id, updateProduct, {
    new: true,
  });
  return result;
};

const deleteSingleProduct = async (id: string) => {
  const result = await productModel.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  getSingleProductBySlug,
  updateSingleProduct,
  deleteSingleProduct
};
