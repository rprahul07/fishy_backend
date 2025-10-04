import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import { Customer } from './Customer.js';

export const OTP = sequelize.define('OTP', {
  code: { type: DataTypes.STRING(6), allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false }, // store phone number directly
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  used: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });

// Association (optional - customer may not exist yet)
Customer.hasMany(OTP);
OTP.belongsTo(Customer, { foreignKey: { allowNull: true } });
