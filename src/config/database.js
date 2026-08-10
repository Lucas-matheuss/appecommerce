import { Sequelize } from "sequelize"
import dotenv from 'dotenv'

dotenv.config()

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST']
for (const env of requiredEnv) {
    if (!process.env[env]){
        console.error(`❌ Erro crítico: A variável de ambiente ${env} não foi definida!`);
        process.exit(1);
    }
}
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432, // Usa 5432 como padrão se não for definido
        dialect: process.env.DB_DIALECT || 'postgres', // Usa postgres como padrão
        logging: process.env.NODE_ENV === 'development' ? console.log : false, // Desativa logs SQL em produção
        define: {
            timestamps: true, // Garante createdAt e updatedAt por padrão
            underscored: true // Usa snake_case (ex: user_id) nas colunas para boas práticas
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
export default sequelize