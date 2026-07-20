import { model, Schema } from "mongoose"
import type { TReturn } from "./return.interface.js"



const returnSchema = new Schema<TReturn>({
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    productID: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    description: {
      type: String,
    },
     reason: {
      type: String,
      enum: ['Product Defect', 'Wrong Item', 'Size Issue', 'Changed Mind', 'Other'],
     required: true,
    },

},
{
    timestamps:true
}
)



export const returnModel = model<TReturn>('return',returnSchema)

 