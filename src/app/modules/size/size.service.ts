import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { sizeSearchableFields } from "./size.constant.js";
import type { TSize } from "./size.interface.js";
import { sizeModel } from "./size.model.js";



const createSize = async (size: TSize) => {
  const result = await sizeModel.create(size);
  return result;
};
// const getAllCategory = async () => {
//   const result = await sizeModel.find();
//   return result;
// };

const getAllSize = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(sizeModel.find(), query)
    const sizeData = queryBuilder
        .filter()
        .search(sizeSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        sizeData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleSize = async (id: string) => {
  const result = await sizeModel.findById(id);
  return result;
};

const getSingleSizeBySlug = async (slug: string) => {
  const result = await sizeModel.findOne({ slug });
  return result;
};

const updateSingleSize = async (
  id: string,
  updateSize: TSize,
) => {
  const result = await sizeModel.findByIdAndUpdate(id, updateSize, {
    new: true,
  });
  return result;
};

const deleteSingleSize = async (id: string) => {
  const result = await sizeModel.findByIdAndDelete(id);
  return result;
};

export const sizeService = {
  createSize,
  getAllSize ,
  getSingleSize,
  getSingleSizeBySlug,
  updateSingleSize,
  deleteSingleSize,
};
