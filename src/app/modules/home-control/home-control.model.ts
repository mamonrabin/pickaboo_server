import { model, Schema } from 'mongoose';
import type { THome } from './home-control.interface.js';

const homeSchema = new Schema<THome>(
  {
    title: {
      type: String,
    },
    landing: {
      type: String,
      enum: [
        'Categories',
        'Best Selling',
        'Flash Sale',
        'Featured Products',
        'New Arrivals',
        'About',
        'Brands',
        'Testimonials',
        'FAQ',
        'Newsletter',
      ],
      required: true,
    },
    order: {
      type: String,
      enum: [
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth',
        'seventh',
        'eighth',
        'ninth',
        'tenth',
      ],
      required: true,
    },

    enabled: {
      type: String,
      enum: ['Active', 'In Active'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  },
);

export const homeModel = model<THome>('home', homeSchema);
