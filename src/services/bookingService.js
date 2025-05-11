import pool from '../config/database.js';

const BUSINESS_HOURS = {
  start: '09:00',
  end: '17:00',
  interval: 60, // minutes
};

export const bookingService = {
  // Get available time slots for a specific date and service
  async getAvailableTimeSlots(date, serviceId) {
    try {
      // Get service duration
      const [services] = await pool.query(
        'SELECT duration FROM services WHERE id = ?',
        [serviceId]
      );

      if (services.length === 0) {
        throw new Error('Service not found');
      }

      // Convert duration string to minutes
      const serviceDuration = parseInt(services[0].duration.match(/\d+/)[0]);
      
      // Generate all possible time slots
      const timeSlots = [];
      let currentTime = new Date(`${date}T${BUSINESS_HOURS.start}`);
      const endTime = new Date(`${date}T${BUSINESS_HOURS.end}`);

      while (currentTime < endTime) {
        timeSlots.push(currentTime.toTimeString().slice(0, 5));
        currentTime.setMinutes(currentTime.getMinutes() + BUSINESS_HOURS.interval);
      }

      // Get booked slots
      const [bookings] = await pool.query(
        'SELECT booking_time FROM bookings WHERE booking_date = ? AND service_id = ? AND status != "cancelled"',
        [date, serviceId]
      );

      const bookedTimes = new Set(bookings.map(b => b.booking_time.slice(0, 5)));

      // Filter out booked slots
      return timeSlots.filter(time => !bookedTimes.has(time));
    } catch (error) {
      console.error('Error getting available time slots:', error);
      throw error;
    }
  },

  // Create a new booking
  async createBooking(userId, serviceId, date, time) {
    try {
      // Check if slot is available
      const availableSlots = await this.getAvailableTimeSlots(date, serviceId);
      if (!availableSlots.includes(time)) {
        throw new Error('Time slot is not available');
      }

      // Create booking
      const [result] = await pool.query(
        'INSERT INTO bookings (user_id, service_id, booking_date, booking_time) VALUES (?, ?, ?, ?)',
        [userId, serviceId, date, time]
      );

      return result.insertId;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get user's bookings
  async getUserBookings(userId) {
    try {
      const [bookings] = await pool.query(
        `SELECT b.*, s.name as service_name, s.duration, s.price 
         FROM bookings b 
         JOIN services s ON b.service_id = s.id 
         WHERE b.user_id = ? 
         ORDER BY b.booking_date, b.booking_time`,
        [userId]
      );
      return bookings;
    } catch (error) {
      console.error('Error getting user bookings:', error);
      throw error;
    }
  },

  // Update booking status
  async updateBookingStatus(bookingId, status, userId = null) {
    try {
      let query = 'UPDATE bookings SET status = ? WHERE id = ?';
      const params = [status, bookingId];

      // If userId is provided, ensure the booking belongs to the user
      if (userId) {
        query += ' AND user_id = ?';
        params.push(userId);
      }

      const [result] = await pool.query(query, params);
      
      if (result.affectedRows === 0) {
        throw new Error('Booking not found or unauthorized');
      }

      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  // Get upcoming bookings for admin
  async getUpcomingBookings() {
    try {
      const [bookings] = await pool.query(
        `SELECT b.*, u.name as client_name, u.email as client_email,
         s.name as service_name, s.duration, s.price 
         FROM bookings b 
         JOIN users u ON b.user_id = u.id 
         JOIN services s ON b.service_id = s.id 
         WHERE b.booking_date >= CURDATE() 
         AND b.status != 'cancelled' 
         ORDER BY b.booking_date, b.booking_time`
      );
      return bookings;
    } catch (error) {
      console.error('Error getting upcoming bookings:', error);
      throw error;
    }
  }
}; 