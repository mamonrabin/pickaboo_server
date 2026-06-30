import type { TBlog } from './blog.interface.js';
import { blogModel } from './blog.model.js';

const createBlog = async (blog: TBlog) => {
  const result = await blogModel.create(blog);
  return result;
};
const getAllBlog = async () => {
  const result = await blogModel.find().populate('couponId');
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await blogModel.findById(id).populate('couponId');
  return result;
};

const updateSingleBlog = async (id: string, updateBlog: TBlog) => {
  const result = await blogModel.findByIdAndUpdate(id, updateBlog, {
    new: true,
  });
  return result;
};

const deleteSingleBlog = async (id: string) => {
  const result = await blogModel.findByIdAndDelete(id);
  return result;
};

export const blogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
};
