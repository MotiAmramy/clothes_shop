import { Response } from "express";
import { Order } from "../models/order.model";
import { AuthRequest } from "../middleware/auth.middleware";
import { Cart } from "../models/cart.model";

// Create new order
export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not identified" });
        }

        const { items, totalAmount } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Order must contain items" });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
        });

        await newOrder.save();

        // Optional: Clear user's cart after successful order
        await Cart.deleteOne({ userId });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error create order", error });
    }
};

// Get user orders (history)
export const getOrders = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not identified" });
        }

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};
