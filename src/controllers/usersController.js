import User from "../models/User.js"

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        if(!name || !email) {
            return res.status(400).json({ error: "Nome e email são obrigatórios"})
        }
       
        const newUser = await User.create({ name, email })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error ao listar usuários' })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({ error: ' Usuário não encontrado' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = User.findByPk(req.params.id)
        if(!user){
           return res.status(404).json({ error: "Usuário não encontrado"})
        }
        const { name, email } = req.body
        await user.update({ name, email })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.parms.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }
        await user.destroy()
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
}