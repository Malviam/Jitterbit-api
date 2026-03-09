# Jitterbit API — Passo a Passo

API RESTful em Node.js com Express e MongoDB Atlas para gerenciamento de pedidos.

---

# Estrutura do Projeto

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



# PASSO A PASSO DE CONFIGURAÇÃO

# PASSO 1 — Instalar o Node.js
Acesse https://nodejs.org e baixe a versão LTS (recomendada).
Verifique a instalação:
```bash
node -v
npm -v
```

---

# Criar cluster no MongoDB Atlas
Cluster já criado.

# Obter a Connection String do Atlas
String do atlas :
MONGODB_URI=mongodb+srv://ronaldoricorj:ronaldo123@ordersdb.xiv9l8w.mongodb.net/?appName=ordersdb

PORT=3000

  

---

# Clonar/Criar o projeto e instalar dependências

```bash
# Entrar na pasta do projeto
cd jitterbit-api

# Instalar dependências
npm install
```

---

# Configurar o arquivo .env

Copie o arquivo de exemplo e edite com seus dados:
```bash
cp .env.example .env
```

Edite o `.env`:
```env
MONGODB_URI=mongodb+srv://ronaldoricorj:ronaldo123@ordersdb.xiv9l8w.mongodb.net/?appName=ordersdb

PORT=3000
---

# PASSO 6 — Rodar a aplicação

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

# ENDPOINTS DISPONÍVEIS

# Criar Pedido
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

# Buscar Pedido por Número
**GET** `http://localhost:3000/order/v10089015vdb-01`

---

# Listar Todos os Pedidos
**GET** `http://localhost:3000/order/list`

---

# Atualizar Pedido
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

# Deletar Pedido
**DELETE** `http://localhost:3000/order/v10089015vdb-01`

---

# Testando com cURL

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

# Mapeamento de Campos

| Body da Requisição (PT) | Banco de Dados (EN) |
|-------------------------|---------------------|
| `numeroPedido`          | `orderId`           |
| `valorTotal`            | `value`             |
| `dataCriacao`           | `creationDate`      |
| `items[].idItem`        | `items[].productId` |
| `items[].quantidadeItem`| `items[].quantity`  |
| `items[].valorItem`     | `items[].price`     |

Adicionado Collections do Postman para referencia e documentação.
