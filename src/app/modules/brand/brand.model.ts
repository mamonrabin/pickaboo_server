import { model, Schema, type HydratedDocument } from 'mongoose';

import { generateSlug } from '../../utils/slug.js';
import type { TBrand } from './brand.interface.js';

const brandSchema = new Schema<TBrand>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

brandSchema.pre('save', async function () {
  const brand = this as HydratedDocument<TBrand>;

  if (
    (brand.isModified('title') || brand.isNew) &&
    brand.title
  ) {
    brand.slug = generateSlug(brand.title);
  }
});

export const brandModel = model<TBrand>('brand', brandSchema);
