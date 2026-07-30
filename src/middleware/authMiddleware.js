import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado'})
    }
}