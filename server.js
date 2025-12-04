import express from 'express';
import { sequelize } from './config/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import privateRoutes from './routes/privateRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import fishRoutes from './routes/fishRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import collaboratorRoutes from './routes/collaboratorRoutes.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // parse JSON bodies

// Health check
app.get('/', (req, res) => res.send('🟢 Fishy API is running'));

// Routes
app.use('/api/auth', authRoutes);       // authentication routes (OTP-based registration)
app.use('/api/public', publicRoutes);   // public routes (no auth)
app.use('/api/private', privateRoutes); // private/admin routes (with auth middleware)
app.use('/api/customers', customerRoutes);
app.use('/api/fish', fishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/collaborators', collaboratorRoutes);

// Error handling middleware (catch all)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Database sync
const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected!');
    // Note: Use migrations/add-auth-columns.sql for schema changes
    // alter: true has SQL Server compatibility issues with DEFAULT constraints
    await sequelize.sync(); // creates tables if not exist
    console.log('✅ All models synced!');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
};

syncDB();

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
