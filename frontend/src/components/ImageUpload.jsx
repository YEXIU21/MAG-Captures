// Image Upload Component
import React, { useState, useContext } from 'react';
import api from '../utils/api';
import { Upload, X, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ImageUpload = ({ onUploadSuccess, multiple = false }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError('');
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      
      if (multiple) {
        files.forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append('image', files[0]);
      }

      const endpoint = multiple ? '/upload/multiple' : '/upload/single';
      const response = await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const uploadedData = multiple ? response.data.files : [{ url: response.data.url }];
      setUploadedImages([...uploadedImages, ...uploadedData]);
      setFiles([]);
      
      if (onUploadSuccess) {
        onUploadSuccess(uploadedData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-accent rounded-lg p-8 text-center bg-accent bg-opacity-5">
        <Upload className="mx-auto mb-4 text-accent" size={48} />
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Upload Images</h3>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {multiple ? 'Drag and drop images or click to select (up to 10)' : 'Drag and drop an image or click to select'}
        </p>
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="inline-block bg-accent text-primary px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-opacity-90 transition"
        >
          Choose Files
        </label>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Selected Files ({files.length})</h4>
          <div className="space-y-2 mb-4">
            {files.map((file, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{file.name}</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-accent text-primary font-bold py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h4 className={`font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
            <CheckCircle size={20} className="text-green-500" />
            Uploaded Images ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
