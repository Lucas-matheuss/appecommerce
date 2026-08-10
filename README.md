# 🛒 App E-Commerce

Uma plataforma de e-commerce full-stack completa, desenvolvida com tecnologias modernas e melhores práticas de desenvolvimento. Este projeto demonstra proficiência em **backend robusto**, **frontend responsivo** e **arquitetura escalável**.

---

## 🎯 Sobre o Projeto

**App E-Commerce** é uma aplicação full-stack que oferece uma experiência completa de compra online. O projeto foi desenvolvido para demonstrar expertise em desenvolvimento web moderno, com foco em:

- ✅ **Arquitetura bem definida** (Frontend e Backend separados)
- ✅ **Segurança** (JWT, Bcrypt para criptografia de senhas)
- ✅ **Banco de dados relacional** (PostgreSQL com Sequelize ORM)
- ✅ **API RESTful robusta** (Express.js)
- ✅ **Interface responsiva** (React com Vite)
- ✅ **Fluxo de autenticação** completo

---

## 🏗️ Arquitetura do Projeto

```
appecommerce/
├── backend/                    # API Node.js
│   ├── src/
│   │   ├── config/            # Configurações
│   │   ├── migrations/        # Migrações do banco
│   │   ├── seeders/           # Dados iniciais
│   │   ├── models/            # Modelos Sequelize
│   │   ├── routes/            # Rotas da API
│   │   ├── controllers/       # Lógica de negócio
│   │   ├── middleware/        # Autenticação e validação
│   │   └── server.js          # Inicialização
│   ├── package.json           # Dependências backend
│   └── .env                   # Variáveis de ambiente
│
└── frontend/                   # Aplicação React
    ├── src/
    │   ├── components/        # Componentes React
    │   ├── pages/            # Páginas
    │   ├── styles/           # CSS
    │   └── main.jsx          # Ponto de entrada
    ├── package.json          # Dependências frontend
    ├── vite.config.js        # Configuração Vite
    └── index.html            # HTML principal
```

---

## 💻 Stack Tecnológico

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Banco de Dados:** PostgreSQL 8.22.0
- **ORM:** Sequelize 6.37.8
- **Autenticação:** JWT (jsonwebtoken 9.0.3)
- **Segurança:** Bcrypt 6.0.0 (criptografia de senhas)
- **Variáveis:** dotenv 17.4.2

### Frontend
- **Biblioteca:** React
- **Build Tool:** Vite
- **Cliente HTTP:** Axios
- **Linguagem:** JavaScript ES6+

---

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js v16+ 
- npm ou yarn
- PostgreSQL instalado e rodando
- Git

### Instalação e Configuração

#### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/Lucas-matheuss/appecommerce.git
cd appecommerce
```

#### 2️⃣ Configurar Backend

```bash
cd backend (ou pasta raiz se backend estiver lá)

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais PostgreSQL

# Executar migrações
npm run migrate

# Executar seeds (dados iniciais)
npm run seed

# Iniciar servidor
npm start
# Ou em desenvolvimento
npm run dev
```

O backend estará disponível em `http://localhost:3000`

#### 3️⃣ Configurar Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## 🔑 Funcionalidades Principais

### 👤 Autenticação
- ✅ Registro de usuários com criptografia de senha (Bcrypt)
- ✅ Login com geração de JWT
- ✅ Validação de tokens em rotas protegidas
- ✅ Refresh token (se implementado)

### 🛍️ Produtos
- ✅ Listagem de produtos
- ✅ Detalhes do produto
- ✅ Busca e filtros
- ✅ Categorias

### 🛒 Carrinho de Compras
- ✅ Adicionar produtos ao carrinho
- ✅ Remover itens
- ✅ Atualizar quantidade

### 📦 Pedidos
- ✅ Criação de pedidos
- ✅ Histórico de compras
- ✅ Rastreamento de status

### 💳 Checkout
- ✅ Informações de entrega
- ✅ Métodos de pagamento
- ✅ Resumo do pedido

---

## 📊 Estrutura do Banco de Dados

O projeto utiliza **Sequelize** como ORM com migrações para versionamento do banco:

```bash
# Criar nova migração
npm run migration:create -- --name=nome_da_migracao

# Executar migrações
npm run migrate

# Desfazer migrações
npm run migrate:undo

# Executar seeds
npm run seed

# Desfazer seeds
npm run seed:undo
```

---

## 🔐 Segurança

- 🔐 **Senhas criptografadas** com Bcrypt
- 🎫 **JWT** para autenticação stateless
- 🔒 **Variáveis de ambiente** (.env) para dados sensíveis
- ✅ **Validação** de entrada em todas as rotas
- 🛡️ **Middleware** de autenticação e autorização

---

## 🧪 Scripts Disponíveis

### Backend
```bash
npm start              # Inicia o servidor em produção
npm run dev           # Inicia com nodemon (desenvolvimento)
npm run migrate       # Executa migrações pendentes
npm run migrate:undo  # Desfaz última migração
npm run seed          # Executa seeds
npm run seed:undo     # Desfaz seeds
npm run migration:create # Cria nova migração
```

### Frontend
```bash
npm run dev           # Inicia servidor de desenvolvimento
npm run build         # Compila para produção
npm run preview       # Preview da build
```

---

## 🌐 API Endpoints (Exemplos)

### Autenticação
```
POST   /api/auth/register          # Registrar novo usuário
POST   /api/auth/login             # Login de usuário
POST   /api/auth/refresh           # Renovar token
```

### Produtos
```
GET    /api/products               # Listar todos os produtos
GET    /api/products/:id           # Obter produto por ID
GET    /api/categories             # Listar categorias
```

### Carrinho
```
GET    /api/cart                   # Obter carrinho
POST   /api/cart/add               # Adicionar ao carrinho
DELETE /api/cart/:productId        # Remover do carrinho
```

### Pedidos
```
POST   /api/orders                 # Criar pedido
GET    /api/orders                 # Listar pedidos do usuário
GET    /api/orders/:id             # Obter detalhes do pedido
```

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=appecommerce

# JWT
JWT_SECRET=sua_chave_secreta_bem_forte
JWT_EXPIRE=24h

# Servidor
PORT=3000
NODE_ENV=development

# Frontend (opcional)
REACT_APP_API_URL=http://localhost:3000
```

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📚 Recursos Utilizados

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [JWT.io](https://jwt.io/)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

---

## 📄 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo `package.json` para mais detalhes.

---

## 👨‍💻 Autor

**Lucas Matheuss**  
GitHub: [@Lucas-matheuss](https://github.com/Lucas-matheuss)

---

## 💡 Destaques do Projeto

✨ **O que demonstra este projeto:**

- ✅ Domínio de **Node.js e Express**
- ✅ Experiência com **ORMs** (Sequelize)
- ✅ Conhecimento de **segurança** (JWT, Bcrypt)
- ✅ Proficiência em **React e Vite**
- ✅ Compreensão de **arquitetura full-stack**
- ✅ Boas práticas em **versionamento de banco** (migrations)
- ✅ Capacidade de **design de API RESTful**
- ✅ Organização e **estrutura de código profissional**

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma [issue](https://github.com/Lucas-matheuss/appecommerce/issues) no repositório.

---

**Desenvolvido com ❤️ por Lucas Matheuss**
