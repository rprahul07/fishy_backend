import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import { Customer } from './Customer.js';
import { Fish } from './Fish.js';

export const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' }
}, { timestamps: true });

// Associations
Customer.hasMany(Order);
Order.belongsTo(Customer);

Fish.hasMany(Order);
Order.belongsTo(Fish);
