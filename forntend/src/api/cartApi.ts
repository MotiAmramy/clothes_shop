import client from "./client";
import { ProductItemData } from "../hooks/useFetchProducts";

export const fetchCart = async (): Promise<ReadonlyArray<ProductItemData>> => {
    return client.get("/cart");
};

export const syncCart = async (cart: ReadonlyArray<ProductItemData>) => {
    return client.put("/cart", { cart });
};
