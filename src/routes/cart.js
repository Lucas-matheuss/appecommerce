import { Router } from 'express'
import { addToCart, getCart, removeFromCart, clearCart } from '../controllers/cartController.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', authenticate, addToCart)
router.get('/', authenticate, getCart)
router.post('/remove', authenticate, removeFromCart)
router.delete('/', authenticate, clearCart)

export default router