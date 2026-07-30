import { Router } from "express";
import { createProduct, getProducts, getProductsById, updateProduct, deleteProduct } from "../controllers/productsController.js";

const router = Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:id', getProductsById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router