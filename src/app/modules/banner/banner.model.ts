import { model, Schema, type HydratedDocument } from 'mongoose';
import type { TCategory } from './banner.interface.js';
import { generateSlug } from '../../utils/slug.js';

const categorySchema = new Schema<TCategory>(
  {
    categoryName: { type: String, required: true },
    title: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre('save', async function () {
  const category = this as HydratedDocument<TCategory>;

  if (
    (category.isModified('categoryName') || category.isNew) &&
    category.categoryName
  ) {
    category.slug = generateSlug(category.categoryName);
  }
});

export const categoryModel = model<TCategory>('category', categorySchema);
