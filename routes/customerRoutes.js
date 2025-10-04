import express from 'express';
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController.js';

const router = express.Router();

// CREATE
router.post('/', createCustomer);

// READ ALL
router.get('/', getCustomers);

// READ BY ID
router.get('/:id', getCustomerById);

// UPDATE
router.put('/:id', updateCustomer);

// DELETE
router.delete('/:id', deleteCustomer);

export default router;
