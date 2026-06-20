import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { sizeSearchableFields } from "../size/size.constant.js";
import type { TColor } from "./color.interface.js";
import { colorModel } from "./color.model.js";


const createColor = async (color: TColor) => {
  const result = await colorModel.create(color);
  return result;
};
// const getAllCategory = async () => {
//   const result = await colorModel.find();
//   return result;
// };

const getAllColor = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(colorModel.find(), query)
    const colorData = queryBuilder
        .filter()
        .search(sizeSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        colorData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleColor = async (id: string) => {
  const result = await colorModel.findById(id);
  return result;
};

const getSingleColorBySlug = async (slug: string) => {
  const result = await colorModel.findOne({ slug });
  return result;
};

const updateSingleColor = async (
  id: string,
  updateColor: TColor,
) => {
  const result = await colorModel.findByIdAndUpdate(id, updateColor, {
    new: true,
  });
  return result;
};

const deleteSingleColor = async (id: string) => {
  const result = await colorModel.findByIdAndDelete(id);
  return result;
};

export const colorService = {
  createColor,
  getAllColor ,
  getSingleColor,
  getSingleColorBySlug,
  updateSingleColor,
  deleteSingleColor,
};
