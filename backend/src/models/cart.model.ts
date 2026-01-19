import { Schema, model, Document, Types } from "mongoose";

export interface ICartItem {
    _id: string; // Product ID
    title: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
}

export interface ICart extends Document {
    userId: Types.ObjectId;
    items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>(
    {
        _id: { type: String, required: true }, // Keeping as string to match frontend's product ID format
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
    },
    { _id: false } // We use the product's _id
);

const CartSchema = new Schema<ICart>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        items: [CartItemSchema],
    },
    { timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);
