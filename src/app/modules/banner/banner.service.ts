import type { TBanner } from "./banner.interface.js";
import { bannerModel } from "./banner.model.js";




const createBanner = async (banner: TBanner) => {
  const result = await bannerModel.create(banner);
  return result;
};
const getAllBanner = async () => {
  const result = await bannerModel.find();
  return result;
};

const updateSingleBanner = async (
  id: string,
  updateBanner: TBanner,
) => {
  const result = await bannerModel.findByIdAndUpdate(id, updateBanner, {
    new: true,
  });
  return result;
};



const deleteSingleBanner = async (id: string) => {
  const result = await bannerModel.findByIdAndDelete(id);
  return result;
};

export const bannerService = {
  createBanner,
  getAllBanner,
  updateSingleBanner,
  deleteSingleBanner,
};
