# 💸 DevBills API

**DevBills API** é uma aplicação para controle financeiro pessoal, permitindo gerenciar categorias, transações e visualizar relatórios financeiros de forma rápida e eficiente.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)

---

## 🛠️ Funcionalidades

- **Categorias**
  - Criar, listar e gerenciar categorias.
  
- **Transações**
  - Criar, listar e filtrar transações.
  - Obter balanço financeiro (receitas, despesas e saldo).
  - Visualizar evolução financeira mensal.

---

## ⚙️ Configuração do Ambiente

1. **Clone o repositório:**

   ```bash
   gh repo clone nicolassaraivaa/devbills-api
   cd devbills-api
   

2. **Instale as dependências:**

   ```bash
   npm install


3. **Configure as variáveis de ambiente:**

   Copie o arquivo .env.example para .env e preencha os valores necessários, como a URL do banco de dados MongoDB.
   

4. **Acesse a aplicação:**
   
   A API estará disponível em http://localhost:3333.

---

🐳  **Usando Docker:**
Para rodar o projeto com Docker, certifique-se de ter o Docker e o Docker Compose instalados. Em seguida, execute:

  docker-compose up --build
 
---

🧪 Testando a API
Você pode utilizar ferramentas como Postman ou Insomnia para testar os endpoints.

  📁 Categorias
  - GET /categories – Listar categorias
  
  - POST /categories – Criar uma nova categoria

  💳 Transações
  - GET /transactions – Listar transações
  
  - POST /transactions – Criar nova transação
  
  - GET /transactions/dashboard – Obter balanço financeiro
  
  - GET /transactions/financial-evolution – Visualizar evolução mensal

---

## 🔗 Repositórios Relacionados

- [DevBills Interface  (Front-end)](https://github.com/nicolassaraivaa/devbills-front)

