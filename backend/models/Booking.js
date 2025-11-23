// Booking Model
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true
    },
    clientEmail: {
      type: String,
      required: [true, 'Please provide client email'],
      lowercase: true
    },
    clientPhone: {
      type: String,
      required: [true, 'Please provide client phone']
    },
    serviceType: {
      type: String,
      enum: ['portrait', 'event', 'product', 'commercial', 'wedding', 'other'],
      required: true
    },
    bookingDate: {
      type: Date,
      required: [true, 'Please provide booking date']
    },
    duration: {
      type: Number,
      required: [true, 'Please provide session duration (in hours)']
    },
    location: {
      type: String,
      required: [true, 'Please provide location']
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    price: {
      type: Number,
      required: [true, 'Please provide price']
    },
    paid: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
