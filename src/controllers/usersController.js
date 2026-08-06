import User from "../models/User.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        res.json(users)
    } catch (error) {
        console.error("Erro ao listar usuários:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        })
        
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' })
        }
        res.json(user)
    } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
           return res.status(404).json({ error: "Usuário não encontrado." })
        }
        
        const { name, email } = req.body
        await user.update({ name, email })
        
        const updatedUser = { id: user.id, name: user.name, email: user.email, role: user.role }
        res.json(updatedUser)
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' })
        }
        
        await user.destroy()
        res.status(204).send()
    } catch (error) {
        console.error("Erro ao deletar usuário:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' })
    }
}
