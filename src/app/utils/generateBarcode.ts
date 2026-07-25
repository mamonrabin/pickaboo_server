import { CounterModel } from '../modules/counter/counter.model.js';

export const generateBarcode = async (): Promise<string> => {
  const counter = await CounterModel.findByIdAndUpdate(
    'product_barcode',
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );

  const year = new Date().getFullYear();

  return `PRD${year}${counter.sequence.toString().padStart(8, '0')}`;
};