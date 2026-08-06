import Order from '../models/Order.js'
import CartItem from '../models/CartItem.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import { processPayment } from '../services/fakePaymentGateway.js'
import sequelize from '../config/database.js'

export const createOrder = async (req, res) => {
    
    const transaction = await sequelize.transaction()
    
    try {
        const  userId  = req.userId

        const user = await User.findByPk(userId)
        if (!user) {
            await transaction.rollback()
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        
        const cartItems = await CartItem.findAll({
            where: { userId, orderId: null },
            include: [Product],
            transaction
        })

        if (cartItems.length === 0) {
            await transaction.rollback()
            return res.status(400).json({ error: 'Carrinho vazio' })
        }

        const total = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0)

        const order = await Order.create({ userId, total, status: 'pending' }, { transaction })

        for (const item of cartItems) {
            item.orderId = order.id
            await item.save({ transaction })
        }
        
        await transaction.commit()
        
        res.status(201).json({ order, items: cartItems })
    } catch (error) {
        await transaction.rollback()
        console.error("Erro ao criar pedido:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno ao criar o pedido.' })
    }
}

export const getOrdersByUser = async (req, res) => {
    try {
        const userId  = req.userId
        if (!userId) {
            return res.status(400).json({ error: 'O campo userId é obrigatório' });
        }

        const orders = await Order.findAll({
            where: { userId },
            include: [CartItem]
        })
        res.status(200).json(orders)
    } catch (error) {
        console.error("Erro ao buscar pedidos do usuário:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        const order = await Order.findByPk(orderId)
        if (!order){
            return res.status(404).json({ error: 'Pedido não encontrado'})
        }

        order.status = status
        await order.save()

        res.json(order)
    } catch (error) {
        console.error("Erro ao atualizar status do pedido:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const payOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await Order.findByPk(orderId)
        if (!order){
            return res.status(404).json({ error: "Pedido não encontrado" }) 
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ error: 'Este pedido já não está mais pendente.' })
        }

        const paymentResult = await processPayment(orderId, order.total)

        if (paymentResult.status === "sucess") {
            order.status = 'paid'
            await order.save()
            
            return res.json({ 
                message: 'Pagamento realizado com sucesso',
                order,
                transaction: paymentResult.transactionId
             })
        } else {
            order.status = 'failed'
            await order.save()
            
            return res.status(402).json({ 
                error: 'O pagamento foi recusado pelo intermediador.',
                order 
            })
        }
    } catch (error) {
        console.error("Erro ao processar pagamento:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno ao processar o pagamento.' })
    }
}
