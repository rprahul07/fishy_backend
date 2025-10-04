import { Fish } from '../models/Fish.js';

// CREATE
export const createFish = async (req, res) => {
  try {
    const { name, imageURL, price, weight } = req.body;
    if (!name || !price || !weight)
      return res.status(400).json({ success: false, message: 'Missing required fields.' });

    const fish = await Fish.create({ name, imageURL, price, weight });
    res.status(201).json({ success: true, data: fish });
  } catch (error) {
    console.error('❌ Create Fish Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// READ ALL
export const getAllFish = async (req, res) => {
  try {
    const fishes = await Fish.findAll();
    res.status(200).json({ success: true, data: fishes });
  } catch (error) {
    console.error('❌ Get Fish Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// READ BY ID
export const getFishById = async (req, res) => {
  try {
    const fish = await Fish.findByPk(req.params.id);
    if (!fish)
      return res.status(404).json({ success: false, message: 'Fish not found.' });

    res.status(200).json({ success: true, data: fish });
  } catch (error) {
    console.error('❌ Get Fish by ID Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// UPDATE
export const updateFish = async (req, res) => {
  try {
    const fish = await Fish.findByPk(req.params.id);
    if (!fish)
      return res.status(404).json({ success: false, message: 'Fish not found.' });

    await fish.update(req.body);
    res.status(200).json({ success: true, message: 'Fish updated successfully.', data: fish });
  } catch (error) {
    console.error('❌ Update Fish Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// DELETE
export const deleteFish = async (req, res) => {
  try {
    const fish = await Fish.findByPk(req.params.id);
    if (!fish)
      return res.status(404).json({ success: false, message: 'Fish not found.' });

    await fish.destroy();
    res.status(200).json({ success: true, message: 'Fish deleted successfully.' });
  } catch (error) {
    console.error('❌ Delete Fish Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
