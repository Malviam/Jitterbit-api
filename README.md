# 🚀 Jitterbit Orders API — Passo a Passo Completo

API RESTful em Node.js com Express e MongoDB Atlas para gerenciamento de pedidos.

---

## 📁 Estrutura do Projeto

```
jitterbit-api/
├── src/
│   ├── config/
│   │   └── database.js        # Conexão com MongoDB Atlas
│   ├── controllers/
│   │   └── orderController.js # Lógica de negócio + mapeamento de campos
│   ├── middlewares/
│   │   └── errorMiddleware.js # Tratamento global de erros
│   ├── models/
│   │   └── Order.js           # Schema Mongoose
│   ├── routes/
│   │   └── orderRoutes.js     # Definição das rotas
│   └── server.js              # Ponto de entrada da aplicação
├── .env.example               # Modelo do arquivo de variáveis de ambiente
├── .gitignore
└── package.json
```

---

## 🛠️ PASSO A PASSO DE CONFIGURAÇÃO

### PASSO 1 — Instalar o Node.js
Acesse https://nodejs.org e baixe a versão LTS (recomendada).
Verifique a instalação:
```bash
node -v
npm -v
```

---

### PASSO 2 — Criar conta e cluster no MongoDB Atlas

1. Acesse https://www.mongodb.com/cloud/atlas e crie uma conta gratuita.
2. Clique em **"Build a Database"** → escolha **Free (M0)**.
3. Escolha o provedor (AWS/Google/Azure) e região mais próxima → clique **"Create"**.
4. **Crie um usuário do banco:**
   - Username: `admin` (ou qualquer nome)
   - Password: crie uma senha forte → clique **"Create User"**
5. **Libere o acesso de rede:**
   - Em "Where would you like to connect from?" → clique **"Add My Current IP Address"**
   - Ou adicione `0.0.0.0/0` para liberar qualquer IP (desenvolvimento)
6. Clique em **"Finish and Close"** → **"Go to Database"**

---

### PASSO 3 — Obter a Connection String do Atlas

1. No painel do cluster, clique em **"Connect"**
2. Escolha **"Drivers"**
3. Selecione **Node.js** na versão mais recente
4. Copie a string parecida com:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Substitua `<password>` pela senha criada no passo anterior
6. Adicione o nome do banco antes do `?`:
   ```
   mongodb+srv://admin:suasenha@cluster0.xxxxx.mongodb.net/jitterbit-orders?retryWrites=true&w=majority
   ```

---

### PASSO 4 — Clonar/Criar o projeto e instalar dependências

```bash
# Entrar na pasta do projeto
cd jitterbit-api

# Instalar dependências
npm install
```

---

### PASSO 5 — Configurar o arquivo .env

Copie o arquivo de exemplo e edite com seus dados:
```bash
cp .env.example .env
```

Edite o `.env`:
```env
MONGODB_URI=mongodb+srv://admin:suasenha@cluster0.xxxxx.mongodb.net/jitterbit-orders?retryWrites=true&w=majority
PORT=3000
```

---

### PASSO 6 — Rodar a aplicação

```bash
# Modo desenvolvimento (reinicia automaticamente ao salvar)
npm run dev

# Modo produção
npm start
```

Você deverá ver no terminal:
```
✅ MongoDB Atlas conectado: cluster0.xxxxx.mongodb.net
🚀 Servidor rodando em http://localhost:3000
```

---

## 📡 ENDPOINTS DISPONÍVEIS

### ➕ Criar Pedido
**POST** `http://localhost:3000/order`

Body:
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

Resposta (201):
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [{ "productId": 2434, "quantity": 1, "price": 1000 }]
  }
}
```

---

### 🔍 Buscar Pedido por Número
**GET** `http://localhost:3000/order/v10089015vdb-01`

---

### 📋 Listar Todos os Pedidos
**GET** `http://localhost:3000/order/list`

---

### ✏️ Atualizar Pedido
**PUT** `http://localhost:3000/order/v10089015vdb-01`

Body (envie apenas os campos que deseja atualizar):
```json
{
  "valorTotal": 15000,
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 1500
    }
  ]
}
```

---

### 🗑️ Deletar Pedido
**DELETE** `http://localhost:3000/order/v10089015vdb-01`

---

## 🧪 Testando com cURL

```bash
# Criar pedido
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{"numeroPedido":"v10089015vdb-01","valorTotal":10000,"dataCriacao":"2023-07-19T12:24:11.5299601+00:00","items":[{"idItem":"2434","quantidadeItem":1,"valorItem":1000}]}'

# Buscar pedido
curl http://localhost:3000/order/v10089015vdb-01

# Listar todos
curl http://localhost:3000/order/list

# Atualizar
curl -X PUT http://localhost:3000/order/v10089015vdb-01 \
  -H "Content-Type: application/json" \
  -d '{"valorTotal":15000}'

# Deletar
curl -X DELETE http://localhost:3000/order/v10089015vdb-01
```

---

## 🔄 Mapeamento de Campos

| Body da Requisição (PT) | Banco de Dados (EN) |
|-------------------------|---------------------|
| `numeroPedido`          | `orderId`           |
| `valorTotal`            | `value`             |
| `dataCriacao`           | `creationDate`      |
| `items[].idItem`        | `items[].productId` |
| `items[].quantidadeItem`| `items[].quantity`  |
| `items[].valorItem`     | `items[].price`     |

---

## 📤 PASSO 7 — Subir no GitHub

```bash
# Inicializar repositório git
git init

# Adicionar todos os arquivos (o .gitignore já exclui node_modules e .env)
git add .

# Primeiro commit
git commit -m "feat: initial project setup - Orders API"

# Criar repositório no GitHub (github.com → New repository)
# Depois linkar o repositório remoto:
git remote add origin https://github.com/SEU_USUARIO/jitterbit-orders-api.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

---

## 📦 Códigos HTTP utilizados

| Situação                   | Status |
|----------------------------|--------|
| Pedido criado              | 201    |
| Operação bem-sucedida      | 200    |
| Dados inválidos no body    | 400    |
| Pedido não encontrado      | 404    |
| Pedido já existe (duplicado)| 409   |
| Erro interno do servidor   | 500    |
