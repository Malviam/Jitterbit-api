require('dotenv').config(); // Carrega variáveis do .env

const express = require('express');
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globais ─────────────────────
app.use(express.json()); // Parse de JSON no body
app.use(express.urlencoded({ extended: true }));

// ── Rota de health check ────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🚀 Jitterbit Orders API está rodando!', status: 'OK' });
});

// ── Rotas da aplicação ──────────────────────
app.use('/order', orderRoutes);

// ── Middlewares de erro (sempre por último) ─
app.use(notFound);
app.use(errorHandler);

// ── Conexão com o banco e inicialização ─────
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
};

startServer();
