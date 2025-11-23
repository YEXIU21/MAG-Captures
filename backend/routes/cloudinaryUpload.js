// Cloudinary Upload Routes
const express = require('express');
const router = express.Router();
const cloudinaryUpload = require('../middleware/cloudinaryUpload');
const { uploadImage, uploadMultiple, deleteImage } = require('../controllers/cloudinaryUploadController');
const { protect, authorize } = require('../middleware/auth');

// Upload single image
router.post('/single', protect, authorize('admin'), cloudinaryUpload.single('image'), uploadImage);

// Upload multiple images
router.post('/multiple', protect, authorize('admin'), cloudinaryUpload.array('images', 10), uploadMultiple);

// Delete image
router.delete('/:publicId', protect, authorize('admin'), deleteImage);

module.exports = router;
