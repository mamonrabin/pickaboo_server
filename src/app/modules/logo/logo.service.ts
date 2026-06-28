import type { TLogo } from './logo.interface.js';
import { logoModel } from './logo.model.js';

const createLogo = async (logo: TLogo) => {
  const result = await logoModel.create(logo);
  return result;
};
const getAllLogo = async () => {
  const result = await logoModel.find();
  return result;
};

const updateSingleLogo = async (id: string, updateLogo: TLogo) => {
  const result = await logoModel.findByIdAndUpdate(id, updateLogo, {
    new: true,
  });
  return result;
};

const deleteSingleLogo = async (id: string) => {
  const result = await logoModel.findByIdAndDelete(id);
  return result;
};

export const logoService = {
  createLogo,
  getAllLogo,
  updateSingleLogo,
  deleteSingleLogo,
};
