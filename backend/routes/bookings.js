// Booking Routes
const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin'), getAllBookings);
router.get('/:id', protect, getBooking);
router.post('/', createBooking);
router.put('/:id', protect, authorize('admin'), updateBooking);
router.delete('/:id', protect, authorize('admin'), deleteBooking);

module.exports = router;
