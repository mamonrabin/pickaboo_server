import express from 'express';


import upload from '../../utils/ImgUploder.js';
import { blogController } from './blog.controller.js';

const router = express.Router();

router.post(
  '/create-blog',
  upload.single('image'),
  blogController.createBlog,
);
router.get('/', blogController.getAllBlog);
router.get('/:id', blogController.getSingleBlog);
router.put('/:id', blogController.updateSingleBlog);
router.delete('/:id', blogController.deleteSingleBlog);

export const blogRoutes = router;
