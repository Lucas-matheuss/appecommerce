import express from 'express';
import productsRoutes from "./routes/products.js"
import usersRoutes from "./routes/users.js"
import cartRoutes from './routes/cart.js'
import ordersRoutes from './routes/orders.js'
import authRoutes from './routes/auth.js'
import { authenticate } from './middleware/authMiddleware.js'
import { authorizeAdmin } from './middleware/roleMiddleware.js';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("API E-commerce funcionando 🚀")
})

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)

app.use('/products', authRoutes, authorizeAdmin, productsRoutes)

app.use('/cart', cartRoutes, authenticate)
app.use('/orders', ordersRoutes, authenticate)

export default app;