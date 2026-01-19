import { Request, Response } from "express";
import { Cart } from "../models/cart.model";
import { AuthRequest } from "../middleware/auth.middleware"; // Assuming this interface is exported

// Get cart by user ID (from token)
export const getCart = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not identified" });
        }

        const cart = await Cart.findOne({ userId });

        // Return items or empty array
        res.status(200).json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

// Sync cart (Overwrite)
export const syncCart = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not identified" });
        }

        const { cart: items } = req.body; // Expect { cart: [...] }

        if (!Array.isArray(items)) {
            return res.status(400).json({ message: "Invalid cart format" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { userId, items },
            { new: true, upsert: true } // Create if not exists, return new
        );

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Error syncing cart", error });
    }
};
