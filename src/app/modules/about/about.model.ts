import { model, Schema } from 'mongoose';
import type { TAbout } from './about.interface.js';


const aboutSchema = new Schema<TAbout>(
  {
    description: { type: String, required: true },
   
    video: { type: String },
   

    
  },
  {
    timestamps: true,
  },
);

export const aboutModel = model<TAbout>('about', aboutSchema);
