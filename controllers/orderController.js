import { Order } from '../models/Order.js';
import { Customer } from '../models/Customer.js';
import { Fish } from '../models/Fish.js';

// CREATE
export const createOrder = async (req, res) => {
  try {
    const { customerId, fishId, quantity } = req.body;

    if (!customerId || !fishId)
      return res.status(400).json({ success: false, message: 'Customer ID and Fish ID required.' });

    const customer = await Customer.findByPk(customerId);
    const fish = await Fish.findByPk(fishId);

    if (!customer || !fish)
      return res.status(404).json({ success: false, message: 'Customer or Fish not found.' });

    const order = await Order.create({ customerId, fishId, quantity });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Create Order Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// READ ALL
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Customer, Fish] });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('❌ Get Orders Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// READ BY ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Customer, Fish] });
    if (!order)
      return res.status(404).json({ success: false, message: 'Order not found.' });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Get Order Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// UPDATE
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: 'Order not found.' });

    await order.update(req.body);
    res.status(200).json({ success: true, message: 'Order updated.', data: order });
  } catch (error) {
    console.error('❌ Update Order Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// DELETE
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: 'Order not found.' });

    await order.destroy();
    res.status(200).json({ success: true, message: 'Order deleted.' });
  } catch (error) {
    console.error('❌ Delete Order Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
