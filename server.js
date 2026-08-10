import app from './src/app.js';
import sequelize from './src/config/database.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate()
        console.log('📦 Conexão com o banco de dados estabelecida com sucesso.')

        const server = app.listen(PORT, ()=> {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
        })

        const shutdown = async ()=> {
            console.log('\n🛑 Encerrando o servidor de forma limpa...')
            await new Promise((resolve) => server.close(resolve))
            console.log(' Servidor Express fechado')
            
            await sequelize.close()
            console.log('🔌 Conexão com o banco de dados encerrada.');
            process.exit(0)
        }

        process.on('SIGINT', shutdown)
        process.on('SIGTERM', shutdown)

    } catch (error) {
        console.error('Falha ao iniciar o servidor', error)
        process.exit(1)
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Erro não tratado (Unhandle Rejection) em:', promise, 'razão', reason)
})

startServer()