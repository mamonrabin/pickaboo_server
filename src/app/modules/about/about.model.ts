import { model, Schema } from 'mongoose';
import type { TAbout } from './about.interface.js';


const aboutSchema = new Schema<TAbout>(
  {
    description: { type: String, required: true },
   type: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    video: { type: String },
   

    
  },
  {
    timestamps: true,
  },
);

export const aboutModel = model<TAbout>('about', aboutSchema);
