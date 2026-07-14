import { model, Schema } from "mongoose"
import type { TReview } from "./review.interface.js"


const reviewSchema = new Schema<TReview>({
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
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
     type: {
      type: String,
      enum: ['pending', 'approve'],
      default:"pending"
    },

},
{
    timestamps:true
}
)



export const reviewModel = model<TReview>('review',reviewSchema)

 