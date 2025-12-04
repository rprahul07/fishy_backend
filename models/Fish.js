import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

export const Fish = sequelize.define(
  'Fish',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Fishes',   // ✅ explicit table name (recommended)
  }
);
