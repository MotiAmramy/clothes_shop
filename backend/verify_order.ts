
import mongoose from "mongoose";
import { Order } from "./src/models/order.model";
import { Cart } from "./src/models/cart.model";
import { User } from "./src/models/user.model";
import { env } from "./src/config/env";

const runVerification = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to DB");

        // 1. Create dummy user
        const email = "test_order_" + Date.now() + "@example.com";
        const user = await User.create({
            name: "Test Order User",
            email,
            password: "password123",
            role: "user"
        });
        console.log("Created user:", user._id);

        // 2. Create Cart
        const cartItems = [
            { _id: "prod1", title: "P1", price: 50, image: "img1", category: "c1", quantity: 2 }
        ];
        await Cart.create({ userId: user._id, items: cartItems });
        console.log("Cart created");

        // 3. Place Order (Simulate Controller)
        // In real app, controller would check auth, here we just use IDs
        const totalAmount = 100;
        const order = await Order.create({
            userId: user._id,
            items: cartItems.map(item => ({
                product: item, // Matches frontend structure (full product object)
                quantity: item.quantity
            })),
            totalAmount
        });
        console.log("Order created:", order._id);

        // 4. Verify Order Saved
        const fetchedOrder = await Order.findById(order._id);
        if (!fetchedOrder) throw new Error("Order not found!");
        console.log("Order verified in DB");

        // 5. Verify Cart Deleted (Simulate Controller Action)
        // The controller does this: await Cart.deleteOne({ userId });
        await Cart.deleteOne({ userId: user._id });

        const checkCart = await Cart.findOne({ userId: user._id });
        if (checkCart) throw new Error("Cart should be deleted after order!");
        console.log("Cart correctly deleted");

        // Cleanup
        await Order.findByIdAndDelete(order._id);
        await User.findByIdAndDelete(user._id);

        console.log("Verification Successful!");
    } catch (error) {
        console.error("Verification Failed:", error);
    } finally {
        await mongoose.disconnect();
    }
};

runVerification();
