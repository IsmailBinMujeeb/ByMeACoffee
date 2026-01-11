import { Router } from "express";
import {
  createOrder,
  getOrderById,
  updateOrder,
  getAllOrders,
} from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.get("/o/:_id", authMiddleware, getOrderById);
router.get("/", authMiddleware, getAllOrders);
router.put("/:_id", authMiddleware, updateOrder);

export default router;
