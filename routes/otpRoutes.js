import express from 'express';
import {
  generateOTP,
  verifyOTP,
  getAllOTPs,
  getOTPById,
  deleteOTP
} from '../controllers/otpController.js';

const router = express.Router();

// CREATE (Generate OTP)
router.post('/generate', generateOTP);

// VERIFY OTP
router.post('/verify', verifyOTP);

// READ ALL
router.get('/', getAllOTPs);

// READ BY ID
router.get('/:id', getOTPById);

// DELETE
router.delete('/:id', deleteOTP);

export default router;
