import { Router } from "express";
import { createOrder, getOrdersByUser, updateOrderStatus, payOrder } from "../controllers/ordersController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";

const router = Router()

router.post('/',authenticate, createOrder)
router.get('/', authenticate, getOrdersByUser)
router.post('/:orderId/pay', authenticate, payOrder)
router.put('/:orderId/status', authenticate, authorizeAdmin, updateOrderStatus)

export default router