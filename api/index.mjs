import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { validationResult, body } from 'express-validator';
import pool from '../src/config/database.js';
import { auth, isAdmin } from '../src/middleware/auth.js';
import { apiLimiter, authLimiter } from '../src/middleware/rateLimiter.js';
import { secureHeaders, csrfProtection, validationSchemas, errorHandler } from '../src/middleware/security.js';
import { bookingService } from '../src/services/bookingService.js';

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://sst-alpha.vercel.app' 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(secureHeaders);
app.use('/api/', apiLimiter);

// Add static file serving
app.use(express.static('.'));

// Get CSRF token
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Authentication Routes
app.post('/api/auth/register', 
  authLimiter,
  validationSchemas.register,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
});

// Change Password endpoint
app.post('/api/auth/change-password',
  auth,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Get current user
      const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = users[0];
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password change error:', error);
      res.status(500).json({ error: 'Failed to change password' });
    }
});

app.post('/api/auth/login',
  authLimiter,
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      
      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = users[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
});

// Admin Routes
app.get('/api/admin/users',
  auth,
  isAdmin,
  async (req, res) => {
    try {
      const [users] = await pool.query(
        'SELECT id, name, email, role, created_at FROM users'
      );
      res.json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.patch('/api/admin/users/:userId/role',
  auth,
  isAdmin,
  [
    body('role').isIn(['user', 'admin'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId } = req.params;
      const { role } = req.body;

      const [result] = await pool.query(
        'UPDATE users SET role = ? WHERE id = ?',
        [role, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ error: 'Failed to update user role' });
    }
});

// Protected Routes
app.get('/api/products', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products');
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', 
  auth, 
  isAdmin,
  validationSchemas.product,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, description, price, category, stock } = req.body;
      await pool.query(
        'INSERT INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, category, stock]
      );
      
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
});

app.get('/api/services', async (req, res) => {
  try {
    const [services] = await pool.query('SELECT * FROM services');
    res.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Booking Routes
app.get('/api/bookings/available-slots',
  auth,
  validationSchemas.timeSlot,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { date, service_id } = req.query;
      const slots = await bookingService.getAvailableTimeSlots(date, service_id);
      res.json({ slots });
    } catch (error) {
      next(error);
    }
});

app.post('/api/bookings',
  auth,
  csrfProtection,
  validationSchemas.booking,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { service_id, booking_date, booking_time } = req.body;
      const bookingId = await bookingService.createBooking(
        req.user.id,
        service_id,
        booking_date,
        booking_time
      );

      res.status(201).json({ 
        message: 'Booking created successfully',
        booking_id: bookingId
      });
    } catch (error) {
      next(error);
    }
});

app.get('/api/bookings/my-bookings',
  auth,
  async (req, res, next) => {
    try {
      const bookings = await bookingService.getUserBookings(req.user.id);
      res.json({ bookings });
    } catch (error) {
      next(error);
    }
});

app.patch('/api/bookings/:bookingId/status',
  auth,
  validationSchemas.updateBooking,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { bookingId } = req.params;
      const { status } = req.body;
      
      // Allow admins to update any booking, but users can only update their own
      const userId = req.user.role === 'admin' ? null : req.user.id;
      await bookingService.updateBookingStatus(bookingId, status, userId);

      res.json({ message: 'Booking status updated successfully' });
    } catch (error) {
      next(error);
    }
});

// Admin Booking Routes
app.get('/api/admin/bookings/upcoming',
  auth,
  isAdmin,
  async (req, res, next) => {
    try {
      const bookings = await bookingService.getUpcomingBookings();
      res.json({ bookings });
    } catch (error) {
      next(error);
    }
});

// Service Management Routes
app.post('/api/services',
  auth,
  isAdmin,
  csrfProtection,
  validationSchemas.service,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, description, price, duration } = req.body;
      const [result] = await pool.query(
        'INSERT INTO services (name, description, price, duration) VALUES (?, ?, ?, ?)',
        [name, description, price, duration]
      );

      res.status(201).json({ 
        message: 'Service created successfully',
        service_id: result.insertId
      });
    } catch (error) {
      next(error);
    }
});

app.put('/api/services/:serviceId',
  auth,
  isAdmin,
  csrfProtection,
  validationSchemas.service,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { serviceId } = req.params;
      const { name, description, price, duration } = req.body;

      const [result] = await pool.query(
        'UPDATE services SET name = ?, description = ?, price = ?, duration = ? WHERE id = ?',
        [name, description, price, duration, serviceId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.json({ message: 'Service updated successfully' });
    } catch (error) {
      next(error);
    }
});

// Error handling middleware
app.use(errorHandler);

// Export the Express API
export default app; 