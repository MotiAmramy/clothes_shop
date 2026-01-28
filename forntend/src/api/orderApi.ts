import client from "./client";
import { ProductItemData } from "../hooks/useFetchProducts";

export interface OrderItem {
    product: ProductItemData;
    quantity: number;
}

export interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
}

export interface ShippingAddress {
    city: string;
    street: string;
    number: string;
}

export const createOrder = async (orderData: { items: OrderItem[]; totalAmount: number; shippingAddress: ShippingAddress }) => {
    return client.post<Order>("/orders", orderData);
};

export const fetchOrders = async () => {
    return client.get<Order[]>("/orders") as unknown as Promise<Order[]>;
};
