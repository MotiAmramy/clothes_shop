import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { auth } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

// Public
router.get("/", categoryController.getCategories);

// Admin only
router.post("/", auth, isAdmin, categoryController.createCategory);
router.delete("/:id", auth, isAdmin, categoryController.deleteCategory);

export default router;
