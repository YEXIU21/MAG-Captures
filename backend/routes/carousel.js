// Carousel Routes
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all carousel images
router.get('/images', (req, res) => {
  try {
    const carouselDir = path.join(__dirname, '../../frontend/public/images carousell');
    
    // Check if directory exists
    if (!fs.existsSync(carouselDir)) {
      return res.status(200).json({
        success: true,
        images: []
      });
    }

    // Read all files in the directory
    const files = fs.readdirSync(carouselDir);
    
    // Filter image files and sort them
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort()
      .map(file => `/images carousell/${file}`);

    res.status(200).json({
      success: true,
      images: imageFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
