import { OTP } from '../models/OTP.js';
import { Customer } from '../models/Customer.js';
import crypto from 'crypto';

// CREATE / GENERATE OTP
export const generateOTP = async (req, res) => {
  try {
    const { customerId } = req.body;
    const customer = await Customer.findByPk(customerId);
    if (!customer)
      return res.status(404).json({ success: false, message: 'Customer not found.' });

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otp = await OTP.create({ code, expiresAt, CustomerId: customerId });
    res.status(201).json({ success: true, message: 'OTP generated.', data: { code } });
  } catch (error) {
    console.error('❌ Generate OTP Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { customerId, code } = req.body;

    const otp = await OTP.findOne({ where: { CustomerId: customerId, code, used: false } });
    if (!otp) return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    if (otp.expiresAt < new Date())
      return res.status(400).json({ success: false, message: 'OTP expired.' });

    otp.used = true;
    await otp.save();

    res.status(200).json({ success: true, message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('❌ Verify OTP Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// READ ALL
export const getAllOTPs = async (req, res) => {
  try {
    const otps = await OTP.findAll({ include: [Customer] });
    res.status(200).json({ success: true, data: otps });
  } catch (error) {
    console.error('❌ Get OTPs Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// READ BY ID
export const getOTPById = async (req, res) => {
  try {
    const otp = await OTP.findByPk(req.params.id, { include: [Customer] });
    if (!otp)
      return res.status(404).json({ success: false, message: 'OTP not found.' });

    res.status(200).json({ success: true, data: otp });
  } catch (error) {
    console.error('❌ Get OTP Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// DELETE
export const deleteOTP = async (req, res) => {
  try {
    const otp = await OTP.findByPk(req.params.id);
    if (!otp)
      return res.status(404).json({ success: false, message: 'OTP not found.' });

    await otp.destroy();
    res.status(200).json({ success: true, message: 'OTP deleted successfully.' });
  } catch (error) {
    console.error('❌ Delete OTP Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
