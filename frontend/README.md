# App E-Commerce - Frontend

Frontend React para o projeto App E-Commerce.

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn

### Instalação

```bash
# Instale as dependências
npm install

# Ou com yarn
yarn install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Ou com yarn
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Compile o projeto
npm run build

# Ou com yarn
yarn build
```

Os arquivos compilados estarão na pasta `dist/`.

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura de Pastas

```
frontend/
├── src/
│   ├── main.jsx          # Ponto de entrada React
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos do App
│   └── index.css         # Estilos globais
├── index.html            # Arquivo HTML principal
├── vite.config.js        # Configuração do Vite
├── package.json          # Dependências
└── README.md             # Este arquivo
```

## 🔗 Conectar com o Backend

O Vite está configurado com proxy para redirecionar requisições `/api` para `http://localhost:3000`.

Exemplo:
```javascript
import axios from 'axios'

// Isso chamará http://localhost:3000/users
const response = await axios.get('/api/users')
```

## 📚 Recursos Úteis

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Axios Docs](https://axios-http.com)

## 📝 Notas

- Certifique-se de que o backend está rodando na porta 3000
- Use `.env.local` para variáveis de ambiente locais
- O hot reload (atualização em tempo real) está habilitado por padrão
