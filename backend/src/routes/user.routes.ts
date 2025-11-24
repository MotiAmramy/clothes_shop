import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller";
import { auth } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", auth, isAdmin, getUsers);
router.get("/:id", auth, getUser);

export default router;
