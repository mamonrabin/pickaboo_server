import { QueryBuilder } from "../../utils/QueryBuilder.js";
import type { TReturn } from "./return.interface.js";
import { returnModel } from "./return.model.js";





const createReturn = async (returns: TReturn) => {
  const result = await returnModel.create(returns);
  return result;
};
const getReturn = async () => {
  const result = await returnModel.find().populate("userID","name email").populate("productID","title");
  return result;
};


const getAllReturn = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(returnModel.find(), query)
    const returnsData = queryBuilder
        .filter()
        // .search(userSearchableFields)
        .sort()
        .fields()
        .paginate()
         .apply();

    const [data, meta] = await Promise.all([
        returnsData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleReturn = async (id: string) => {
  const result = await returnModel.findById(id);
  return result;
};


const deleteSingleReturn = async (id: string) => {
  const result = await returnModel.findByIdAndDelete(id);
  return result;
};

const updateSingleReturn = async (
  id: string,
  updateReturn: TReturn,
) => {
  const result = await returnModel.findByIdAndUpdate(id, updateReturn, {
    new: true,
  });
  return result;
};

export const returnService = {
  createReturn,
  getReturn,
  getSingleReturn,
  deleteSingleReturn,
  getAllReturn,
  updateSingleReturn
};
