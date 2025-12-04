import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import { Customer } from './Customer.js';
import { Fish } from './Fish.js';

export const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },

    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: 'id',
      },
    },

    FishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fish,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Orders',
  }
);

// ✅ Explicit correct associations
Customer.hasMany(Order, { foreignKey: 'CustomerId' });
Order.belongsTo(Customer, { foreignKey: 'CustomerId' });

Fish.hasMany(Order, { foreignKey: 'FishId' });
Order.belongsTo(Fish, { foreignKey: 'FishId' });
