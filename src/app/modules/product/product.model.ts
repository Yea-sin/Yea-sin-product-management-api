import { model, Schema } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

export const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
export const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

export const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
  },
  variants: [variantSchema],
  inventory: inventorySchema,
});

export const ProductModel = model<Product>("Product", productSchema);
