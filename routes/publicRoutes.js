import express from 'express';
import { getAllFish, getFishById } from '../controllers/fishController.js';
import { createCustomer } from '../controllers/customerController.js';

const router = express.Router();

// 🐟 Public Routes
router.get('/fish', getAllFish);
router.get('/fish/:id', getFishById);

// 👤 Customer can register (public)
router.post('/customer', createCustomer);

export default router;
