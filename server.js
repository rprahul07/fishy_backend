import express from 'express';
import { sequelize } from './config/dbConnection.js';
import { Customer } from './models/Customer.js';
import { Fish } from './models/Fish.js';
import { Order } from './models/Order.js';
import { OTP } from './models/OTP.js';

const app = express();
const port = 3000;


const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true }); // creates tables if not exist
    console.log('All models synced!');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
};

syncDB();



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
