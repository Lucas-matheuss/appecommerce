import { Router } from 'express'
import { addToCart, getCart, removeFromCart, clearCart } from '../controllers/cartController.js'

const router = Router()

router.post('/add', addToCart)
router.get('/:userId', getCart)
router.post('/remove', removeFromCart)
router.delete('/:userId', clearCart)

export default router