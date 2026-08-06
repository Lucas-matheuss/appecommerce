import CartItem from "../models/CartItem.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

export const addToCart = async (req, res) =>  {
    try {
        const userId = req.userId 
        const { productId, quantity } = req.body

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'Usuário, produto e quantidade são obrigatórios.' })
        }
    
        const user = await User.findByPk(userId)
        const product = await Product.findByPk(productId)
    
        if (!user || !product) {
            return res.status(404).json({ error: 'Usuário ou produto não encontrado.' })
        }
    
        let cartItem = await CartItem.findOne({ 
            where: { userId, productId }, 
            include: [Product] 
        })
    
        if (cartItem) {
            cartItem.quantity += Number(quantity)
            await cartItem.save()
            
            console.log(`${cartItem.Product.name} atualizado. Nova quantidade: ${cartItem.quantity}`)
            return res.status(200).json(cartItem)
        } else {
            const newCartItem = await CartItem.create({ userId, productId, quantity })
            
            const populatedItem = await CartItem.findByPk(newCartItem.id, { include: [Product] })
            return res.status(201).json(populatedItem)
        }
    
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.userId

        const cartItems = await CartItem.findAll({
            where: { userId },
            include: [Product]
        })
        res.json(cartItems)
    } catch (error) {
        console.error("Erro ao listar carrinho:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId
        const { productId } = req.body 
        
        const cartItem = await CartItem.findOne({ where: { userId, productId } })

        if (!cartItem){
            return res.status(404).json({ error: 'Item não encontrado no carrinho.' })
        }

        await cartItem.destroy()
        res.json({ message: 'Item removido do carrinho com sucesso.' })
    } catch (error) {
        console.error("Erro ao remover do carrinho:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const clearCart = async (req, res) => {
    try {
        const userId = req.userId
        
        await CartItem.destroy({ where: { userId } })
        res.json({ message: 'Carrinho limpo com sucesso.' })
    } catch (error) {
        console.error("Erro ao limpar carrinho:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }   
}
