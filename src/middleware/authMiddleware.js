import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido.' })
    }

    try {
        // Remove o prefixo 'Bearer ' caso ele exista na string
        const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader;
        
        const decoded = jwt.verify(token, SECRET)
        
        // Injeta os dados no objeto req para os próximos controllers usarem
        req.user = decoded
        req.userId = decoded.id // Atalho muito útil para os controladores de carrinho e orders!
        
        next()
    } catch (error) {
        console.error("Erro na validação do token:", error)
        return res.status(401).json({ error: 'Token inválido ou expirado.' })
    }
}
