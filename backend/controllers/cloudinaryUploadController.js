// Cloudinary Upload Controller
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Upload single image to Cloudinary
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'mag-photographs/portfolio',
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ success: false, message: 'Upload failed' });
        }

        res.status(200).json({
          success: true,
          message: 'Image uploaded successfully',
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upload multiple images to Cloudinary
exports.uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'mag-photographs/portfolio',
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete image from Cloudinary
exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ success: false, message: 'Public ID required' });
    }

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
