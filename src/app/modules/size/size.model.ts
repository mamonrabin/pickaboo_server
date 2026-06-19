import { model, Schema, type HydratedDocument } from 'mongoose';

import { generateSlug } from '../../utils/slug.js';
import type { TSize } from './size.interface.js';

const sizeSchema = new Schema<TSize>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

sizeSchema.pre('save', async function () {
  const size = this as HydratedDocument<TSize>;

  if (
    (size.isModified('title') || size.isNew) &&
    size.title
  ) {
    size.slug = generateSlug(size.title);
  }
});

export const sizeModel = model<TSize>('size', sizeSchema);
