import express from 'express';
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import productsRoutes from "./routes/products.js"
import usersRoutes from "./routes/users.js"
import cartRoutes from './routes/cart.js'
import ordersRoutes from './routes/orders.js'
import authRoutes from './routes/auth.js'


const app = express();

// Helmet: Configura cabeçalhos HTTP para proteger contra vulnerabilidades web conhecidas
app.use(helmet());

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Morgan: Registra os logs de cada requisição que chega no servidor (Método, URL, Status, Tempo)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json( { limit: '10kb' }))

app.get('/', (req, res) => {
    res.json({ message: "API E-commerce funcionando 🚀", status: 'OK'})
})

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)

// Middleware Global de Erros - Captura erros disparados dentro das suas rotas (ex: try/catch)
app.use((err, req, res, next) => {
    console.error('💥 Erro interno no servidor:', err);
    
    // Evita expor a stack de erro interna em produção para o cliente
    const message = process.env.NODE_ENV === 'production' 
        ? 'Ocorreu um erro interno no servidor.' 
        : err.message;

    res.status(err.status || 500).json({
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

export default app;