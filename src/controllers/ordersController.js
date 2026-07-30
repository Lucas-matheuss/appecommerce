import Order from '../models/Order.js'
import CartItem from '../models/CartItem.js'
import Product from '../models/Product.js'
import User from '../models/User.js'
import { processPayment } from '../services/fakePaymentGateway.js'


export const createOrder = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        const cartItems = await CartItem.findAll({
            where: { userId, orderId: null },
            include: [Product]
        })

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Carrinho vazio' })
        }

        const total = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0)

        const order = await Order.create({ userId, total, status: 'pending' })

        for (const item of cartItems) {
            item.orderId = order.id
            await item.save()
        }
        
        res.status(201).json({ order, items: cartItems })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar pedido' })
    }
}

export const getOrdersByUser = async (req, res) => {
    console.log("Buscando....")
    try {
        const { userId } = req.body
        console.log(`ID ${userId} TIPO->`, typeof userId)
        if (!userId) {
      return res.status(400).json({ error: 'O campo userId é obrigatório' });
    }

        const orders = await Order.findAll({
            where: { userId },
            include: [CartItem]
        })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
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
        res.status(500).json({ error: 'Erro ao atualizar status do pedido' })
    }
}

export const payOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await Order.findByPk(orderId)
        if (!order){
            return res.status(404).json({ error: "Pedido não enconstrado" })
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ error: 'Pedido já esta sendo processado' })
        }

        const paymentResult = await processPayment(orderId, order.total)

        if (paymentResult.status ==="success") {
            order.status = 'paid'
            await order.save()
        }

        res.json({ 
            message: 'Pagamento realizado com sucesso',
            order,
            transaction: paymentResult.transactionId
         })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar pagamento' })
    }
}