import express from 'express';
import {
  createFish,
  getAllFish,
  getFishById,
  updateFish,
  deleteFish
} from '../controllers/fishController.js';

const router = express.Router();

// CREATE
router.post('/', createFish);

// READ ALL
router.get('/', getAllFish);

// READ BY ID
router.get('/:id', getFishById);

// UPDATE
router.put('/:id', updateFish);

// DELETE
router.delete('/:id', deleteFish);

export default router;
