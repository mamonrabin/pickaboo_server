
import type { THome } from "./home-control.interface.js";
import { homeModel } from "./home-control.model.js";






const createHome = async (homes: THome) => {
  const result = await homeModel.create(homes);
  return result;
};
const getAllHome = async () => {
  const result = await homeModel.find().populate("userID","name email").populate("productID","title");
  return result;
};




const getSingleHome = async (id: string) => {
  const result = await homeModel.findById(id);
  return result;
};


const deleteSingleHome = async (id: string) => {
  const result = await homeModel.findByIdAndDelete(id);
  return result;
};

const updateSingleHome = async (
  id: string,
  updateHome: THome,
) => {
  const result = await homeModel.findByIdAndUpdate(id, updateHome, {
    new: true,
  });
  return result;
};

export const homeService = {
  createHome,
  getSingleHome,
  deleteSingleHome,
  getAllHome,
  updateSingleHome
};
