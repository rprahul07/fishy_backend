import { Customer } from '../models/Customer.js';
import { OTP } from '../models/OTP.js';
import crypto from 'crypto';

// ✅ STEP 1: Request OTP (Phone Number Only)
export const requestOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required.' 
      });
    }

    // Validate phone number format (basic validation)
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number format. Must be 10 digits.' 
      });
    }

    // Generate 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Check if customer exists
    let customer = await Customer.findOne({ where: { phoneNumber } });
    
    // Create OTP record
    await OTP.create({ 
      code, 
      phoneNumber,
      expiresAt,
      CustomerId: customer ? customer.id : null
    });

    // TODO: Send OTP via SMS service (Twilio, AWS SNS, etc.)
    console.log(`📱 OTP for ${phoneNumber}: ${code}`);

    res.status(200).json({ 
      success: true, 
      message: 'OTP sent successfully to your phone number.',
      // Remove this in production - only for testing
      debug: { code }
    });
  } catch (error) {
    console.error('❌ Request OTP Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// ✅ STEP 2: Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number and OTP code are required.' 
      });
    }

    // Find OTP record
    const otp = await OTP.findOne({ 
      where: { 
        phoneNumber, 
        code, 
        used: false 
      },
      order: [['createdAt', 'DESC']] // Get the latest OTP
    });

    if (!otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP code.' 
      });
    }

    // Check if OTP is expired
    if (otp.expiresAt < new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired. Please request a new one.' 
      });
    }

    // Mark OTP as used
    otp.used = true;
    await otp.save();

    // Check if customer exists
    let customer = await Customer.findOne({ where: { phoneNumber } });

    if (!customer) {
      // Create new customer with verified phone
      customer = await Customer.create({ 
        phoneNumber,
        isVerified: true,
        profileCompleted: false
      });
    } else {
      // Update existing customer verification status
      customer.isVerified = true;
      await customer.save();
    }

    res.status(200).json({ 
      success: true, 
      message: 'Phone number verified successfully.',
      data: {
        customerId: customer.id,
        phoneNumber: customer.phoneNumber,
        isVerified: customer.isVerified,
        profileCompleted: customer.profileCompleted
      }
    });
  } catch (error) {
    console.error('❌ Verify OTP Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// ✅ STEP 3: Complete Profile (After OTP Verification)
export const completeProfile = async (req, res) => {
  try {
    const { phoneNumber, name, address } = req.body;

    if (!phoneNumber || !name || !address) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number, name, and address are required.' 
      });
    }

    // Find customer by phone number
    const customer = await Customer.findOne({ where: { phoneNumber } });

    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found. Please verify your phone number first.' 
      });
    }

    // Check if phone is verified
    if (!customer.isVerified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Phone number not verified. Please verify OTP first.' 
      });
    }

    // Update customer profile
    customer.name = name;
    customer.address = address;
    customer.profileCompleted = true;
    await customer.save();

    res.status(200).json({ 
      success: true, 
      message: 'Profile completed successfully.',
      data: {
        id: customer.id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        isVerified: customer.isVerified,
        profileCompleted: customer.profileCompleted
      }
    });
  } catch (error) {
    console.error('❌ Complete Profile Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};

// ✅ Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required.' 
      });
    }

    // Mark all previous OTPs as used
    await OTP.update(
      { used: true },
      { where: { phoneNumber, used: false } }
    );

    // Generate new OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const customer = await Customer.findOne({ where: { phoneNumber } });

    await OTP.create({ 
      code, 
      phoneNumber,
      expiresAt,
      CustomerId: customer ? customer.id : null
    });

    console.log(`📱 Resent OTP for ${phoneNumber}: ${code}`);

    res.status(200).json({ 
      success: true, 
      message: 'OTP resent successfully.',
      debug: { code }
    });
  } catch (error) {
    console.error('❌ Resend OTP Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error.' 
    });
  }
};
