import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

export const Customer = sequelize.define(
  'Customer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true, // nullable until profile completion
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,    // ✅ PostgreSQL unique constraint
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    profileCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Customers',   // ✅ explicitly set table name
  }
);

/**
 * Sync the table (NO raw SQL)
 */
await Customer.sync({ alter: true });