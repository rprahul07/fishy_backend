import express from 'express';
import { adminController } from '../controllers/adminController.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes below require admin authentication
router.use(verifyAdmin);

// 👨‍💼 Admin can manage fish
router.post('/admin/fish', adminController.addFish);
router.delete('/admin/fish/:id', adminController.deleteFish);

// 👨‍💼 Admin can manage customers
router.get('/admin/customers', adminController.getAllCustomers);
router.delete('/admin/customer/:id', adminController.deleteCustomer);

export default router;
