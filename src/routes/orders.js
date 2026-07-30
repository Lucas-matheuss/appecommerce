import { Router } from "express";
import { createOrder, getOrdersByUser, updateOrderStatus, payOrder } from "../controllers/ordersController.js";

const router = Router()

router.post('/', createOrder)
router.get('/:userId', getOrdersByUser)
router.put('/:orderId/status', updateOrderStatus)
router.post('/:orderId/pay', payOrder)

export default router