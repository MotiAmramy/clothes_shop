import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
    product: {
        _id: string; // Product ID snapshot
        title: string;
        price: number;
        image: string;
        category?: string;
        description?: string;
    };
    quantity: number;
}

export interface IOrder extends Document {
    userId: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
}

const OrderItemSchema = new Schema<IOrderItem>(
    {
        product: {
            _id: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            category: { type: String },
            description: { type: String },
        },
        quantity: { type: Number, required: true, default: 1 },
    },
    { _id: false }
);

const OrderSchema = new Schema<IOrder>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: [OrderItemSchema],
        totalAmount: { type: Number, required: true },
    },
    { timestamps: true }
);

export const Order = model<IOrder>("Order", OrderSchema);
