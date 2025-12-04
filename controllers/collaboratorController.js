import { Collaborator } from '../models/Collaborator.js';
import { Customer } from '../models/Customer.js';

// ✅ CREATE Collaborator
export const createCollaborator = async (req, res) => {
  try {
    const { name, email, phoneNumber, role, CustomerId } = req.body;

    if (!name || !email || !CustomerId)
      return res.status(400).json({ success: false, message: 'Name, email, and CustomerId are required.' });

    // Verify customer exists
    const customer = await Customer.findByPk(CustomerId);
    if (!customer)
      return res.status(404).json({ success: false, message: 'Customer not found.' });

    // Check if collaborator with same email already exists for this customer
    const existing = await Collaborator.findOne({ where: { email, CustomerId } });
    if (existing)
      return res.status(409).json({ success: false, message: 'Collaborator with this email already exists for this customer.' });

    const collaborator = await Collaborator.create({ name, email, phoneNumber, role, CustomerId });
    res.status(201).json({ success: true, data: collaborator });
  } catch (error) {
    console.error('❌ Create Collaborator Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ READ ALL Collaborators
export const getCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.findAll({ include: [Customer] });
    res.status(200).json({ success: true, data: collaborators });
  } catch (error) {
    console.error('❌ Get Collaborators Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ READ Collaborator by ID
export const getCollaboratorById = async (req, res) => {
  try {
    const collaborator = await Collaborator.findByPk(req.params.id, { include: [Customer] });
    if (!collaborator)
      return res.status(404).json({ success: false, message: 'Collaborator not found.' });

    res.status(200).json({ success: true, data: collaborator });
  } catch (error) {
    console.error('❌ Get Collaborator Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ GET Collaborators by Customer ID
export const getCollaboratorsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Verify customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer)
      return res.status(404).json({ success: false, message: 'Customer not found.' });

    const collaborators = await Collaborator.findAll({ 
      where: { CustomerId: customerId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ 
      success: true, 
      count: collaborators.length,
      data: collaborators 
    });
  } catch (error) {
    console.error('❌ Get Collaborators By Customer Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ UPDATE Collaborator
export const updateCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.findByPk(req.params.id);
    if (!collaborator)
      return res.status(404).json({ success: false, message: 'Collaborator not found.' });

    // Whitelist of allowed fields for update
    const { name, email, phoneNumber, role, isActive } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    await collaborator.update(updateData);
    res.status(200).json({ success: true, message: 'Collaborator updated.', data: collaborator });
  } catch (error) {
    console.error('❌ Update Collaborator Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ✅ DELETE Collaborator
export const deleteCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.findByPk(req.params.id);
    if (!collaborator)
      return res.status(404).json({ success: false, message: 'Collaborator not found.' });

    await collaborator.destroy();
    res.status(200).json({ success: true, message: 'Collaborator deleted successfully.' });
  } catch (error) {
    console.error('❌ Delete Collaborator Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
