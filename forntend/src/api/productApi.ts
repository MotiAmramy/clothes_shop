import client from "./client";
import { ProductItemData } from "../hooks/useFetchProducts";

export const fetchProducts = async (): Promise<ReadonlyArray<ProductItemData>> => {
    return client.get("/products");
};

// Admin only functions
export const addProduct = async (product: Omit<ProductItemData, "_id">) => {
    return client.post("/products", product);
};

export const updateProduct = async (id: string, product: Partial<ProductItemData>) => {
    return client.put(`/products/${id}`, product);
};

export const deleteProduct = async (id: string) => {
    return client.delete(`/products/${id}`);
};
