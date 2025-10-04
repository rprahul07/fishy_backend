import { Customer } from '../models/Customer.js';

// ✅ CREATE Customer
export const createCustomer = async (req, res) => {
  try {
    const { name, phoneNumber, address } = req.body;

    if (!name || !phoneNumber || !address)
      return res.status(400).json({ success: false, message: 'All fields are required.' });

    const existing = await Customer.findOne({ where: { phoneNumber } });
    if (existing)
      return res.status(409).json({ success: false, message: 'Phone number already exists.' });

    const customer = await Customer.create({ name, phoneNumber, address });
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    console.error('❌ Create Customer Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ READ ALL Customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    console.error('❌ Get Customers Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ READ Customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer)
      return res.status(404).json({ success: false, message: 'Customer not found.' });

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error('❌ Get Customer Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ UPDATE Customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer)
      return res.status(404).json({ success: false, message: 'Customer not found.' });

    await customer.update(req.body);
    res.status(200).json({ success: true, message: 'Customer updated.', data: customer });
  } catch (error) {
    console.error('❌ Update Customer Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ DELETE Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer)
      return res.status(404).json({ success: false, message: 'Customer not found.' });

    await customer.destroy();
    res.status(200).json({ success: true, message: 'Customer deleted successfully.' });
  } catch (error) {
    console.error('❌ Delete Customer Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
