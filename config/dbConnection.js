// dbconnection.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'postgres',                             // database name
  'postgres.vwsznygcxjxbglfhnpnr',        // username
  'Conjuring@3797',                       // password
  {
    host: 'aws-1-ap-south-1.pooler.supabase.com',
    port: 6543,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,       // needed for Supabase SSL
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);