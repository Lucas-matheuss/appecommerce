import { Router } from "express";
import { createProduct, getProducts, getProductsById, updateProduct, deleteProduct } from "../controllers/productsController.js";
import { authenticate } from '../middleware/authMiddleware.js'
import { authorizeAdmin } from "../middleware/roleMiddleware.js";
const router = Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:id',authenticate, authorizeAdmin, getProductsById)
router.put('/:id',authenticate, authorizeAdmin, updateProduct)
router.delete('/:id',authenticate, authorizeAdmin, deleteProduct)

export default router