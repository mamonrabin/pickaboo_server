import { Schema, model } from 'mongoose';

const counterSchema = new Schema(
  {
    _id: {
      type: String,
    },
    sequence: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  },
);

export const CounterModel = model('counter', counterSchema);