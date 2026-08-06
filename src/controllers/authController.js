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

        const newUser = await User.create({ name, email, password, role: role || 'user' })

        res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: newUser.id })
    } catch (error) {
        console.error("Erro no registro:", error)

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' })
        }

        res.status(500).json({ error: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "E-mail e senha são obrigatórios" })
        }

        const user = await User.findOne({ where: { email }})
        
        if (!user) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '2h' })

        res.json({ message: 'Login realizado com sucesso', token })
    } catch (error) {
        
        console.error("Erro no login:", error)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.' })
    }
}
