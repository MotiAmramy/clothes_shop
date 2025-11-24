import { Router } from "express";
import * as product_controller from "../controllers/product.controller";

import { auth } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", product_controller.getProducts);
router.get("/:id", product_controller.getProduct);

router.post("/", auth, isAdmin, product_controller.createProduct);
router.patch("/:id", auth, isAdmin, product_controller.updateProduct);
router.delete("/:id", auth, isAdmin, product_controller.deleteProduct);

export default router;
