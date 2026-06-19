import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { subcategorySearchableFields } from "./sub-category.constant.js";
import type { TSubCategory } from "./sub-category.interface.js";
import { subcategoryModel } from "./sub-category.model.js";



const createSubCategor = async (subcategory: TSubCategory) => {
  const result = await subcategoryModel.create(subcategory);
  return result;
};
// const getAllCategory = async () => {
//   const result = await subcategoryModel.find();
//   return result;
// };

const getAllSubCategory = async (query: Record<string, string>) => {

    // const queryBuilder = new QueryBuilder(subcategoryModel.find().populate("category","categoryName title"), query)
    const queryBuilder = new QueryBuilder(subcategoryModel.find().populate("category","categoryName"), query)
    const subcategoriesData = queryBuilder
        .filter()
        .search(subcategorySearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        subcategoriesData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleSubCategory = async (id: string) => {
  const result = await subcategoryModel.findById(id).populate("category","categoryName");
  return result;
};

const getSingleSubCategoryBySlug = async (slug: string) => {
  const result = await subcategoryModel.findOne({ slug }).populate("category","categoryName");
  return result;
};

const updateSingleSubCategory = async (
  id: string,
  updateCategory: TSubCategory,
) => {
  const result = await subcategoryModel.findByIdAndUpdate(id, updateCategory, {
    new: true,
  });
  return result;
};

const deleteSingleSubCategory = async (id: string) => {
  const result = await subcategoryModel.findByIdAndDelete(id);
  return result;
};

export const subcategoryService = {
  createSubCategor,
  getAllSubCategory,
  getSingleSubCategory,
  getSingleSubCategoryBySlug,
  updateSingleSubCategory,
  deleteSingleSubCategory,
};
