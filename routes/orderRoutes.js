import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// CREATE
router.post('/', createOrder);

// READ ALL
router.get('/', getOrders);

// READ BY ID
router.get('/:id', getOrderById);

// UPDATE
router.put('/:id', updateOrder);

// DELETE
router.delete('/:id', deleteOrder);

export default router;
