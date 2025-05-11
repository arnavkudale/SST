import helmet from 'helmet';
import csrf from 'csurf';
import { body, param, query } from 'express-validator';

// Secure headers middleware using helmet
export const secureHeaders = helmet();

// CSRF protection middleware
export const csrfProtection = csrf({ cookie: true });

// Validation schemas
export const validationSchemas = {
  booking: [
    body('service_id').isInt().withMessage('Invalid service ID'),
    body('booking_date')
      .isDate()
      .isAfter(new Date().toISOString().split('T')[0])
      .withMessage('Booking date must be in the future'),
    body('booking_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Invalid time format (HH:mm)'),
  ],

  product: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Product name must be between 2 and 100 characters'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    body('price')
      .isFloat({ min: 0.01 })
      .withMessage('Price must be greater than 0'),
    body('category')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Category must be between 2 and 50 characters'),
    body('stock')
      .isInt({ min: 0 })
      .withMessage('Stock must be a non-negative number'),
  ],

  service: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Service name must be between 2 and 100 characters'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    body('price')
      .isFloat({ min: 0.01 })
      .withMessage('Price must be greater than 0'),
    body('duration')
      .matches(/^\d+\s*(min|hour)s?$/)
      .withMessage('Duration must be in format: X mins or X hours'),
  ],

  timeSlot: [
    query('date')
      .isDate()
      .isAfter(new Date().toISOString().split('T')[0])
      .withMessage('Date must be in the future'),
    query('service_id')
      .optional()
      .isInt()
      .withMessage('Invalid service ID'),
  ],

  updateBooking: [
    param('bookingId').isInt().withMessage('Invalid booking ID'),
    body('status')
      .isIn(['pending', 'confirmed', 'cancelled'])
      .withMessage('Invalid booking status'),
  ],
};

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      error: 'Invalid CSRF token',
      message: 'Form submission failed. Please try again.'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
}; 