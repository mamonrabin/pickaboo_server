import { model, Schema, type HydratedDocument } from 'mongoose';

import { generateSlug } from '../../utils/slug.js';
import type { TSubCategory } from './sub-category.interface.js';

const subcategorySchema = new Schema<TSubCategory>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    subcategoryName: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

subcategorySchema.pre('save', async function () {
  const subcategory = this as HydratedDocument<TSubCategory>;

  if (
    (subcategory.isModified('subcategoryName') || subcategory.isNew) &&
    subcategory.subcategoryName
  ) {
    subcategory.slug = generateSlug(subcategory.subcategoryName);
  }
});

export const subcategoryModel = model<TSubCategory>(
  'subcategory',
  subcategorySchema,
);
