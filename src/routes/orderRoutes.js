const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

// IMPORTANTE: /list deve vir ANTES de /:numeroPedido
// para que Express não interprete "list" como um parâmetro dinâmico

// GET  /order/list             → Listar todos os pedidos
router.get('/list', listOrders);

// POST /order                  → Criar pedido
router.post('/', createOrder);

// GET  /order/:numeroPedido    → Buscar pedido por número
router.get('/:numeroPedido', getOrderById);

// PUT  /order/:numeroPedido    → Atualizar pedido
router.put('/:numeroPedido', updateOrder);

// DELETE /order/:numeroPedido  → Deletar pedido
router.delete('/:numeroPedido', deleteOrder);

module.exports = router;
