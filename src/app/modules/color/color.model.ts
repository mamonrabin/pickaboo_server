import { model, Schema, type HydratedDocument } from 'mongoose';

import { generateSlug } from '../../utils/slug.js';
import type { TColor } from './color.interface.js';

const colorSchema = new Schema<TColor>(
  {
    colorName: { type: String },
    colorCode: { type: String },
    size: {
      type: Schema.Types.ObjectId,
      ref: 'size',
      required: true,
    },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

colorSchema.pre('save', async function () {
  const color = this as HydratedDocument<TColor>;

  if ((color.isModified('colorName') || color.isNew) && color.colorName) {
    color.slug = generateSlug(color.colorName);
  }
});

export const colorModel = model<TColor>('color', colorSchema);
