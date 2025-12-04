import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import { Customer } from './Customer.js';

export const Collaborator = sequelize.define('Collaborator', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: 'viewer' }, // 'viewer', 'editor', 'admin'
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

// Associations - A Customer can have many Collaborators
Customer.hasMany(Collaborator);
Collaborator.belongsTo(Customer);
