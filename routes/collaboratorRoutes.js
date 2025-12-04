import express from 'express';
import {
  createCollaborator,
  getCollaborators,
  getCollaboratorById,
  getCollaboratorsByCustomer,
  updateCollaborator,
  deleteCollaborator
} from '../controllers/collaboratorController.js';

const router = express.Router();

// CREATE
router.post('/', createCollaborator);

// READ ALL
router.get('/', getCollaborators);

// GET COLLABORATORS BY CUSTOMER ID
router.get('/customer/:customerId', getCollaboratorsByCustomer);

// READ BY ID (must be after specific routes to avoid conflicts)
router.get('/:id', getCollaboratorById);

// UPDATE
router.put('/:id', updateCollaborator);

// DELETE
router.delete('/:id', deleteCollaborator);

export default router;
