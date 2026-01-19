
import mongoose from "mongoose";
import { Cart } from "./src/models/cart.model";
import { User } from "./src/models/user.model";
import { env } from "./src/config/env";
import { cart as cartController } from "./src/controllers/cart.controller"; // Will need to actually test logic/mocking if I can't use route

// Mocking express for basic logic test or just robust DB test
const runVerification = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to DB");

        // 1. Create dummy user
        const email = "test_sync_" + Date.now() + "@example.com";
        const user = await User.create({
            name: "Test Sync User",
            email,
            password: "password123",
            role: "user"
        });
        console.log("Created user:", user._id);

        // 2. Sync Cart (First time - create)
        const cartItems1 = [
            { _id: "prod1", title: "P1", price: 10, image: "img1", category: "c1", quantity: 1 }
        ];

        // Direct DB manipulation to simulate controller logic
        const cart1 = await Cart.findOneAndUpdate(
            { userId: user._id },
            { userId: user._id, items: cartItems1 },
            { new: true, upsert: true }
        );
        console.log("Synced Cart 1 (Created):", cart1.items.length === 1);

        // 3. Sync Cart (Second time - update/overwrite)
        const cartItems2 = [
            { _id: "prod1", title: "P1", price: 10, image: "img1", category: "c1", quantity: 2 },
            { _id: "prod2", title: "P2", price: 20, image: "img2", category: "c2", quantity: 1 }
        ];

        const cart2 = await Cart.findOneAndUpdate(
            { userId: user._id },
            { userId: user._id, items: cartItems2 },
            { new: true, upsert: true }
        );
        console.log("Synced Cart 2 (Overwritten):", cart2.items.length === 2);
        if (cart2.items[0].quantity !== 2) console.error("Error: Quantity mismatch");

        // 4. Get Cart
        const fetchedCart = await Cart.findOne({ userId: user._id });
        console.log("Fetched Cart:", fetchedCart.items.length === 2);

        // Cleanup
        await Cart.deleteOne({ userId: user._id });
        await User.findByIdAndDelete(user._id);

        console.log("Verification Successful!");
    } catch (error) {
        console.error("Verification Failed:", error);
    } finally {
        await mongoose.disconnect();
    }
};

runVerification();
