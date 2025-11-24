import { Product } from "../models/product.model";

export const getAllProducts = async () => {
  return await Product.find();
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const createProduct = async (data: {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}) => {
  return await Product.create(data);
};

export const updateProduct = async (
  id: string,
  data: Partial<{
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }>
) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
