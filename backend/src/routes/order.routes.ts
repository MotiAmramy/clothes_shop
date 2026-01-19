import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.use(auth);

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);

export default router;
