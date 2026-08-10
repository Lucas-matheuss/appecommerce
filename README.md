# 🛒 AppEcommerce — API (Backend)

API RESTful em Node.js + Express para um sistema de e‑commerce. Este repositório contém somente o backend: API, models, migrations e seeders.

## 🔎 Visão geral

- Runtime: Node.js (ES Modules)
- Framework: Express
- ORM: Sequelize
- Banco de dados: PostgreSQL
- Autenticação: JWT (jsonwebtoken)
- Criptografia de senhas: bcrypt
- Logs / Segurança: morgan, helmet, cors

## Funcionalidades principais

- Registro e login de usuários com JWT
- Controle de permissões (middleware de autenticação e autorização de admin)
- CRUD de produtos
- Gerenciamento de carrinho de compras
- Criação e consulta de pedidos
- Migrations e seeders com Sequelize

## Requisitos

- Node.js 16+  
- PostgreSQL rodando  
- Git

## Preparação e execução (desenvolvimento)

1. Clone o repositório:

   git clone https://github.com/Lucas-matheuss/appecommerce.git
   cd appecommerce

2. Instale dependências:

   npm install

3. Copie e edite o arquivo de ambiente:

   cp .env.example .env
   Preencha DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, etc.

4. Execute migrações e seeders (opcional, mas recomendado):

   npm run migrate
   npm run seed

5. Inicie a API:

   # desenvolvimento
   npm run dev

   # produção
   npm start

A API inicia na porta definida em PORT no `.env` ou `3000` por padrão.

## Variáveis de ambiente (exemplo)

Use o `.env.example` como referência. Principais variáveis:

```
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=appecommerce

# JWT
JWT_SECRET=uma_chave_secreta
JWT_EXPIRE=24h

# Servidor
PORT=3000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=
```

## Scripts úteis (definidos em package.json)

- npm run dev            — inicia o servidor em dev (server.js)
- npm start              — inicia em produção
- npm run migrate        — executa migrations (Sequelize)
- npm run migrate:undo   — desfaz migrations
- npm run seed           — executa seeders
- npm run seed:undo      — desfaz seeders
- npm run migration:create — gera nova migration

> Verifique `package.json` caso queira adaptar comandos.

## Estrutura principal do projeto

- src/
  - config/        — configuração do Sequelize / database
  - models/        — modelos Sequelize
  - migrations/    — migrações do banco de dados
  - seeders/       — seeders / dados iniciais
  - routes/        — rotas da API (auth, users, products, cart, orders)
  - controllers/   — lógica das rotas
  - middleware/    — authenticate, authorizeAdmin, etc.
  - app.js         — configuração do Express (helmet, cors, morgan, rotas)
- server.js        — inicialização do servidor e conexão com o DB

## Endpoints principais (resumo)

Prefixos conforme `src/app.js`.

Autenticação
- POST /auth/register  — registrar usuário
- POST /auth/login     — login e emissão de JWT
- POST /auth/refresh   — renovar token (se implementado)

Usuários
- GET /users
- (outros endpoints CRUD conforme implementado)

Produtos
- GET /products
- POST /products            — criar produto (normalmente protegido)
- GET /products/:id
- PUT /products/:id         — atualizar (admin)
- DELETE /products/:id      — deletar (admin)

Carrinho
- GET /cart
- POST /cart/add
- DELETE /cart/:productId

Pedidos
- POST /orders
- GET /orders
- GET /orders/:id

Observação: algumas rotas requerem `authenticate` e/ou `authorizeAdmin`. Veja `src/middleware`.

## Exemplos rápido (curl)

Registrar:
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"name":"Usuário","email":"user@example.com","password":"senha"}'

Login:
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"senha"}'

Buscar produtos:
curl http://localhost:3000/products

Criar produto (exemplo com token):
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN_ADMIN>" -d '{"name":"Produto","price":100}'

(Substitua <TOKEN_ADMIN> pelo JWT válido)

## Segurança e middlewares

- Helmet para cabeçalhos seguros
- CORS configurável por ALLOWED_ORIGINS
- Morgan para logs de acesso
- Limite do body JSON em `app.js`
- Tratamento de encerramento gracioso no `server.js` (SIGINT / SIGTERM), fechamento da conexão Sequelize

## Banco de dados

- ORM: Sequelize (migrations e seeders em src/migrations e src/seeders)
- Comandos via scripts npm (ver seção Scripts)

## Contribuição

1. Fork
2. git checkout -b feature/minha-feature
3. Commit: git commit -m "feat: descrição"
4. git push e abra PR

## Licença

Licença definida em `package.json` (ISC).

## Autor

Desenvolvido por Lucas Matheuss
GitHub: https://github.com/Lucas-matheuss
