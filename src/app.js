import express from 'express';
import productsRoutes from "./routes/products.js"
import usersRoutes from "./routes/users.js"
import cartRoutes from './routes/cart.js'
import ordersRoutes from './routes/orders.js'
import authRoutes from './routes/auth.js'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("API E-commerce funcionando 🚀")
})

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

export default app;