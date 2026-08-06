import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body
        if(!name || price === undefined ) {
            return res.status(400).json({ error: "Nome e preço são obrigatórios"})
        }

        if (Number(price) <= 0) {
            return res.status(400).json({ error: "O preço do produto deve ser maior que zero." })
        }

        const newProduct = await Product.create({ name, price})
        res.status(201).json(newProduct);

    } catch (error) {
        console.error("Erro ao criar produto:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
};

export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { count, rows } = await Product.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', DESC]]
        })

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            products: rows
        })
    
    } catch (error) {
        console.error("Erro ao listar produtos:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor' })
    }
}

export const getProductsById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if(!product) {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }
        res.json(product)
    } catch (error) {
        console.error("Erro ao buscar produto:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    };
}

export const updateProduct = async (req, res) => {
    try {    
        const product = await Product.findByPk(req.params.id);
        if(!product) {
            return res.status(404).json({ error: "Produto não encontrado"})
        }

        const { name, price} = req.body

        if (price !== undefined && Number(price) <= 0) {
            return res.status(400).json({ error: "O preço do produto deve ser maior que zero." })
        }

        await product.update({ name, price })
        res.json(product)
    } catch (error) {
        console.error("Erro ao atualizar produto:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            res.status(204).send()
        }

        await product.destroy()
        res.status(204).send()
    } catch (error) {
        or("Erro ao deletar produto:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}