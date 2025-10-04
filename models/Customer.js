import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

export const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: true }, // nullable until profile completion
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: true }, // nullable until profile completion
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }, // track verification status
  profileCompleted: { type: DataTypes.BOOLEAN, defaultValue: false } // track profile completion
}, { timestamps: true });

// Add unique index separately (SQL Server compatible)
Customer.sync().then(() => {
  sequelize.query(
    `IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='UQ_Customers_phoneNumber')
     CREATE UNIQUE INDEX UQ_Customers_phoneNumber ON Customers (phoneNumber);`
  );
});
