import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    rating: Number,
    comment: String,
    date: String,
    reviewerName: String,
    reviewerEmail: String
});
export const Product = mongoose.models.products || mongoose.model("products", productModel);