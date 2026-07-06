import { model, Schema, type HydratedDocument } from "mongoose";
import type { TProduct } from "./product.interface.js";
import { generateSlug } from "../../utils/slug.js";
import { generateSku } from "../../utils/generateSku.js";

const specificationSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },

    slug: { type: String, unique: true, lowercase: true },

    quantity: { type: Number, required: true, min: 0 },
    mrpPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },

    price: { type: Number, min: 0 },

    soldQuantity: { type: Number, default: 0, min: 0 },

    description: { type: String, required: true },

    category: { type: Schema.Types.ObjectId, ref: "category", required: true, index: true },
    subCategory: { type: Schema.Types.ObjectId, ref: "subcategory", required: true, index: true },
    brand: { type: Schema.Types.ObjectId, ref: "brand", required: true, index: true },

    // colors: [{ type: Schema.Types.ObjectId, ref: "color" }],
    // sizes: [{ type: Schema.Types.ObjectId, ref: "size" }],

    thumbnailImage: { type: String, required: true },
    backviewImage: String,
    images: { type: [String], default: [] },

    freeShipping: { type: Boolean, default: false },

    sku: { type: String, unique: true, sparse: true },

    barcode: { type: String },

    inventoryType: { type: String },

    inventories: [
      {
        color: String,
        colorName: String,
        size: String,
        quantity: { type: Number, default: 0 },
      },
    ],

    stock_status: {
      type: String,
      enum: ["in_stock", "out_of_stock", "pre_order"],
      default: "in_stock",
    },

    video_url: String,

    labels: {
      type: String,
      enum: ["New", "Trending", "Limited Stock", "Featured","Best Sellers"],
    },

    tags: { type: [String], default: [] },

    specifications: { type: [specificationSchema], default: [] },

    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: { type: [String], default: [] },

    warranty: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("availableQuantity").get(function () {
  return Math.max((this.quantity || 0) - (this.soldQuantity || 0), 0);
});

productSchema.pre("save", function () {
  const product = this as HydratedDocument<TProduct>;

  /* ---------- Auto Quantity from Inventory ---------- */
  if (product.inventories?.length) {
    product.quantity = product.inventories.reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    );
  }

  try {
    // SLUG (only when needed)
    if (product.isNew || product.isModified("title")) {
      product.slug = generateSlug(product.title);
    }

    // SKU (only generate once)
    if (product.isNew && !product.sku) {
      product.sku = generateSku({
        title: product.title,
        brandId: product.brand?.toString() || "",
        prefix: "PRD",
      });
    }

    // PRICE CALCULATION
    const discount = product.discount || 0;
    product.price =
      product.mrpPrice - (product.mrpPrice * discount) / 100;

    // STOCK STATUS
    const available =
      (product.quantity || 0) - (product.soldQuantity || 0);

    product.stock_status =
      available <= 0 ? "out_of_stock" : "in_stock";

    ;
  } catch (err) {
    console.log(err as Error);
  }
});

productSchema.statics.sellProduct = async function (
  productId: string,
  quantity: number
) {
  return this.findByIdAndUpdate(
    productId,
    {
      $inc: {
        soldQuantity: quantity,
        quantity: -quantity,
      },
    },
    { new: true }
  );
};


productSchema.index({ category: 1, brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ title: "text", description: "text" });

export const productModel = model<TProduct>('product', productSchema);