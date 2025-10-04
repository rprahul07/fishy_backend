import express from 'express';
import {
  requestOTP,
  verifyOTP,
  completeProfile,
  resendOTP
} from '../controllers/authController.js';

const router = express.Router();

// 📱 STEP 1: Request OTP with phone number
router.post('/request-otp', requestOTP);

// ✅ STEP 2: Verify OTP
router.post('/verify-otp', verifyOTP);

// 👤 STEP 3: Complete profile after verification
router.post('/complete-profile', completeProfile);

// 🔄 Resend OTP
router.post('/resend-otp', resendOTP);

export default router;
