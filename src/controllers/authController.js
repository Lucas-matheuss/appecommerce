import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Nome, email e senha são obrigatórios" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword, rolle: role || 'user' })

        res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: newUser.id })
    } catch (error) {
        res.status(500).json({ error: `Erro ao registrar usuário ${error.message}` })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: {email }})
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        const validPasword = await bcrypt.compare(password, user.password)
        if (!validPasword) {
            return res.status(401).json({ error: 'Senha inválida' })
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '2h' })

        res.json({ message: 'Login realizado com sucesso', token })
    } catch (error) {
        res.status(500).json({error: "Erro ao fazer login" })
    }
}