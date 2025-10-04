import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('fishydb', 'admin_startup', 'Bhavan@3797', {
  host: 'fishyserver.database.windows.net',
  dialect: 'mssql',
  dialectOptions: {
    options: { encrypt: true }
  },
  logging: false
});
