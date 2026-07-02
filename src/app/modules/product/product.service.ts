import { productModel } from './product.model.js';
import type { ProductLabel, TProduct } from './product.interface.js';
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
      .populate('category', 'categoryName')
      .populate('sizes', 'title')
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
    .paginate()
    .apply();

  const [data, meta] = await Promise.all([
    productData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getRelatedProducts = async (productId: string, limit = 8) => {
  const product = await productModel.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  // Build filter for related products
  const filters: Record<string, unknown> = {
    _id: { $ne: product._id },
    $or: [
      { subCategory: product.subCategory },
      { category: product.category },
      { brand: product.brand },
    ],
  };

  const relatedProducts = await productModel
    .find(filters)
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .limit(limit)
    .sort({ createdAt: -1 });

  return relatedProducts;
};
const getDiscountProducts = async (limit = 8) => {
  const discountProducts = await productModel
    .find({
      discount: { $gt: 0 },
      stock_status: 'in_stock',
    })
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .sort({ discount: -1, createdAt: -1 })
    .limit(limit);

  return discountProducts;
};

const getProductsByCategory = async (categoryId: string) => {
  const result = await productModel
    .find({ category: categoryId })
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .populate('colors', 'title code')
    .populate('sizes', 'title')
    .sort({ createdAt: -1 });

  return result;
};
const getProductsBySubCategory = async (subCategoryId: string) => {
  const result = await productModel
    .find({ subCategory: subCategoryId })
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .populate('colors', 'title code')
    .populate('sizes', 'title')
    .sort({ createdAt: -1 });

  return result;
};

const getProductsByBrand = async (brandId: string) => {
  const result = await productModel
    .find({ brand: brandId })
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .populate('colors', 'title code')
    .populate('sizes', 'title')
    .sort({ createdAt: -1 });

  return result;
};

const getProductsByLabels = async (label: ProductLabel, limit = 8) => {
  const result = await productModel
    .find({ labels: label })
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .sort({ createdAt: -1 })
    .limit(limit);

  return result;
};

const getBestSellingProducts = async (limit = 8) => {
  const result = await productModel
    .find({
      soldQuantity: { $gt: 0 },
    })
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .sort({ soldQuantity: -1, createdAt: -1 })
    .limit(limit);

  return result;
};

const getNewArrivalProducts = async (limit = 8) => {
  const result = await productModel
    .find()
    .populate('category', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .populate('brand', 'title')
    .sort({ createdAt: -1 })
    .limit(limit);

  return result;
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
  getRelatedProducts,
  getDiscountProducts,
  getNewArrivalProducts,
  getProductsByCategory,
  getProductsBySubCategory,
  getProductsByBrand,
  getProductsByLabels,
  getBestSellingProducts,
  getSingleProduct,
  getSingleProductBySlug,
  updateSingleProduct,
  deleteSingleProduct,
};
