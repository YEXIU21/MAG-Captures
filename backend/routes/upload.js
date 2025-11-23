// Upload Routes
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadImage, uploadMultiple, deleteImage } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

// Upload single image
router.post('/single', protect, authorize('admin'), upload.single('image'), uploadImage);

// Upload multiple images
router.post('/multiple', protect, authorize('admin'), upload.array('images', 10), uploadMultiple);

// Delete image
router.delete('/:filename', protect, authorize('admin'), deleteImage);

module.exports = router;
