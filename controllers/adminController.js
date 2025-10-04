import { Customer } from '../models/Customer.js';
import { Fish } from '../models/Fish.js';

export const adminController = {
  // Add a new fish
  async addFish(req, res) {
    try {
      const fish = await Fish.create(req.body);
      res.status(201).json({ success: true, fish });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Get all customers
  async getAllCustomers(req, res) {
    try {
      const customers = await Customer.findAll();
      res.json({ success: true, customers });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete a customer
  async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Customer.destroy({ where: { id } });
      if (!deleted)
        return res.status(404).json({ success: false, message: 'Customer not found' });
      res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Delete fish
  async deleteFish(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Fish.destroy({ where: { id } });
      if (!deleted)
        return res.status(404).json({ success: false, message: 'Fish not found' });
      res.json({ success: true, message: 'Fish deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
