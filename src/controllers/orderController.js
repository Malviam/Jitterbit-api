const Order = require('../models/Order');

/**
 * Faz o mapeamento dos campos do body (português) para o schema do banco (inglês)
 * numeroPedido  → orderId
 * valorTotal    → value
 * dataCriacao   → creationDate
 * items[].idItem          → items[].productId
 * items[].quantidadeItem  → items[].quantity
 * items[].valorItem       → items[].price
 */
const mapRequestToOrder = (body) => {
  const { numeroPedido, valorTotal, dataCriacao, items } = body;

  return {
    orderId: numeroPedido,
    value: valorTotal,
    creationDate: new Date(dataCriacao),
    items: items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
};

// ─────────────────────────────────────────────
// POST /order  →  Criar novo pedido
// ─────────────────────────────────────────────
const createOrder = async (req, res) => {
  try {
    // Valida campos obrigatórios no body
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    if (!numeroPedido || valorTotal === undefined || !dataCriacao || !items) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios ausentes: numeroPedido, valorTotal, dataCriacao, items',
      });
    }

    // Mapeia e salva
    const orderData = mapRequestToOrder(req.body);
    const order = await Order.create(orderData);

    return res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: order,
    });
  } catch (error) {
    // Erro de chave duplicada (orderId já existe)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Pedido com numeroPedido '${req.body.numeroPedido}' já existe`,
      });
    }

    // Erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('; ') });
    }

    return res.status(500).json({ success: false, message: 'Erro interno do servidor', error: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /order/:numeroPedido  →  Buscar pedido por ID
// ─────────────────────────────────────────────
const getOrderById = async (req, res) => {
  try {
    const { numeroPedido } = req.params;

    const order = await Order.findOne({ orderId: numeroPedido });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido '${numeroPedido}' não encontrado`,
      });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro interno do servidor', error: error.message });
  }
};

// ─────────────────────────────────────────────
// GET /order/list  →  Listar todos os pedidos
// ─────────────────────────────────────────────
const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ creationDate: -1 });

    return res.status(200).json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro interno do servidor', error: error.message });
  }
};

// ─────────────────────────────────────────────
// PUT /order/:numeroPedido  →  Atualizar pedido
// ─────────────────────────────────────────────
const updateOrder = async (req, res) => {
  try {
    const { numeroPedido } = req.params;

    // Verifica se o pedido existe antes de atualizar
    const exists = await Order.findOne({ orderId: numeroPedido });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: `Pedido '${numeroPedido}' não encontrado`,
      });
    }

    // Mapeia apenas os campos enviados no body
    const updateData = {};
    if (req.body.valorTotal !== undefined) updateData.value = req.body.valorTotal;
    if (req.body.dataCriacao) updateData.creationDate = new Date(req.body.dataCriacao);
    if (req.body.items) {
      updateData.items = req.body.items.map((item) => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem,
      }));
    }

    const updated = await Order.findOneAndUpdate(
      { orderId: numeroPedido },
      updateData,
      { new: true, runValidators: true } // Retorna o documento atualizado e roda validações
    );

    return res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: updated,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('; ') });
    }
    return res.status(500).json({ success: false, message: 'Erro interno do servidor', error: error.message });
  }
};

// ─────────────────────────────────────────────
// DELETE /order/:numeroPedido  →  Deletar pedido
// ─────────────────────────────────────────────
const deleteOrder = async (req, res) => {
  try {
    const { numeroPedido } = req.params;

    const deleted = await Order.findOneAndDelete({ orderId: numeroPedido });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Pedido '${numeroPedido}' não encontrado`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Pedido '${numeroPedido}' deletado com sucesso`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro interno do servidor', error: error.message });
  }
};

module.exports = { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };
