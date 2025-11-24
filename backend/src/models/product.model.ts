import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    image: { type: String }
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", ProductSchema);