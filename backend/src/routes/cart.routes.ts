import { Router } from "express";
import * as cartController from "../controllers/cart.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

// Apply auth middleware to all cart routes
router.use(auth);

router.get("/", cartController.getCart);
router.put("/", cartController.syncCart);

export default router;
