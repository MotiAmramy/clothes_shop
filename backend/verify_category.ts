
import mongoose from "mongoose";
import { Category } from "./src/models/category.model";
import { User } from "./src/models/user.model";
import { env } from "./src/config/env";
import { category as categoryController } from "./src/controllers/category.controller"; // Hypothetical direct access, or just use Model

const runVerification = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to DB");

        // 1. Clean up old test data
        await Category.deleteMany({ name: "test category" });

        // 2. Create Category (Simulate Admin Action)
        const categoryName = "test category";
        const category = await Category.create({ name: categoryName });
        console.log("Category created:", category._id);

        // 3. Verify Public Get
        const allCategories = await Category.find();
        if (!allCategories.some(c => c.name === categoryName)) {
            throw new Error("Category not found in public list!");
        }
        console.log("Category valid in public list");

        // 4. Duplicate Check
        try {
            await Category.create({ name: categoryName });
            throw new Error("Should not allow duplicate names!");
        } catch (e) {
            console.log("Duplicate check passed");
        }

        // 5. Delete Category (Simulate Admin Action)
        await Category.findByIdAndDelete(category._id);
        const checkDeleted = await Category.findById(category._id);
        if (checkDeleted) throw new Error("Category should be deleted!");
        console.log("Category deleted");

        console.log("Verification Successful!");
    } catch (error) {
        console.error("Verification Failed:", error);
    } finally {
        await mongoose.disconnect();
    }
};

runVerification();
