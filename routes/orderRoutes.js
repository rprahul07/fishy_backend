import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByCustomer,
  getOrdersByPhone
} from '../controllers/orderController.js';

const router = express.Router();

// CREATE
router.post('/', createOrder);

// READ ALL
router.get('/', getOrders);

// GET ORDERS BY CUSTOMER ID
router.get('/customer/:customerId', getOrdersByCustomer);

// GET ORDERS BY PHONE NUMBER
router.get('/phone/:phoneNumber', getOrdersByPhone);

// READ BY ID (must be after specific routes to avoid conflicts)
router.get('/:id', getOrderById);

// UPDATE
router.put('/:id', updateOrder);

// DELETE
router.delete('/:id', deleteOrder);

export default router;
