import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    audience: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
