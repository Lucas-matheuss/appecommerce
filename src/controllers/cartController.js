import { Model } from "sequelize"
import CartItem from "../models/CartItem.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

export const addToCart = async (req, res) =>  {
    try {
        const {userId, productId, quantity } = req.body
    
        const user = await User.findByPk(userId)
        const product = await Product.findByPk(productId)
    
        if (!userId || !productId) {
            return res.status(400).json({ error: 'usuário ou produto não encontrado' })
        }
    
        let cartItem = await CartItem.findOne({ 
        where: { userId, productId }, 
        include:[{ model: Product }] 
        })
    
        if (cartItem) {
            cartItem.quantity += Number(quantity)
            await cartItem.save()
            console.log(`${cartItem.Product.name} atualizado nova quantidade ${cartItem.quantity}`)
            return res.status(200).json(cartItem)
        } else {
            cartItem = await CartItem.create({ userId, productId, quantity })
            res.status(201).json(cartItem)
        }
    
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar ao carrinho' })
    }
}

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params
        const cartItems = await CartItem.findAll({
            where: { userId },
            include: [Product]
        })
        res.json(cartItems)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar carrinho' })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body
        const cartItem = await CartItem.findOne({ where: { userId, product } })

        if (!cartItem){
            return res.status(404).json({ error: 'Item não encontrado no carrinho' })
        }

        await cartItem.destroy()
        res.json({ message: 'Item removido do carrinho' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item do carrinho' })
    }

}

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params
        await CartItem.destroy({ where: { userId } })
        res.json({ message: 'Carrinho limpo com sucesso' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao limpar carrinho' })
    }   
}