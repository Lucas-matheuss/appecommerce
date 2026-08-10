import { Router } from "express";
import { getUsers, getUserById, updateUser, deleteUser} from '../controllers/usersController.js'
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeAdmin } from "../middleware/roleMiddleware.js";

const router = Router()

router.get('/:id', authenticate, getUserById)
router.put('/:id', authenticate, updateUser)

router.get('/', authenticate, authenticate, getUsers)
router.delete('/:id', authenticate, authenticate, deleteUser)

export default router