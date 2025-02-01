import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { User } from "../models/User";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById((req as any).user.id);
    res.json(user);
});

export { router as userRouter };
