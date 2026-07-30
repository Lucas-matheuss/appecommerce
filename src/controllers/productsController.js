import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
    try {
        const {name, price} = req.body
        if(!name || !price) {
            return res.status(400).json({ error: "Nome e preço são obrigatórios"})
        }

        const newProduct = await Product.create({ name, price})
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' })
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos' })
    }
};

export const getProductsById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if(!product) {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' })
    }
};

export const updateProduct = async (req, res) => {
    try {    
        const product = await Product.findByPk(req.params.id);
        if(!product) {
            return res.status(404).json({ error: "Produto não encontrado"})
        }

        const { name, price} = req.body
        await product.update({ name, price })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = Product.findByPk(req.params.id)
        if (!produtc) {
            res.status(204).send()
        }

        await product.destroy()
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' })
    }
}