import client from "./client";

export interface Category {
    _id: string;
    name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
    return client.get("/categories").then(res => res as unknown as Category[]);
};

export const addCategory = async (name: string): Promise<Category> => {
    return client.post("/categories", { name }).then(res => res as unknown as Category);
};

export const deleteCategory = async (id: string): Promise<void> => {
    return client.delete(`/categories/${id}`);
};
