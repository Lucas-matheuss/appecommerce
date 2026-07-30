import app from './src/app.js';
import sequelize from './src/config/database.js';

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
        console.log('Banco sincronizado com suceso!')
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        })
    }).catch(err => {
        console.error('Erro ao sincronizar banco:', err)
    })
    