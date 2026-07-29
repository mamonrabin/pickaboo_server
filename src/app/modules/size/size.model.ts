import { model, Schema, type HydratedDocument } from 'mongoose';

import { generateSlug } from '../../utils/slug.js';
import type { TSize } from './size.interface.js';

const sizeSchema = new Schema<TSize>(
  {
    size: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

sizeSchema.pre('save', async function () {
  const size = this as HydratedDocument<TSize>;

  if (
    (size.isModified('size') || size.isNew) &&
    size.size
  ) {
    size.slug = generateSlug(size.size);
  }
});

export const sizeModel = model<TSize>('size', sizeSchema);
