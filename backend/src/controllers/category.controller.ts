import { Request, Response } from "express";
import { Category } from "../models/category.model";

// Get all categories (Public)
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};

// Create new category (Admin)
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const existingCategory = await Category.findOne({ name: name.toLowerCase() });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

// Delete category (Admin)
export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};
