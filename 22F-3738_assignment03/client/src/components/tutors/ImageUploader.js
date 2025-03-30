import React, { useRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import axios from 'axios';

const ImageUploader = ({ imageUrl, onImageChange, isPreview }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tutor/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onImageChange(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleDelete = () => {
    onImageChange(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Profile Picture
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={imageUrl || '/images/default-avatar.png'}
          sx={{ width: 150, height: 150 }}
        />

        {!isPreview && (
          <>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <Button
              variant="contained"
              startIcon={<PhotoCamera />}
              onClick={() => fileInputRef.current.click()}
            >
              Upload New Picture
            </Button>

            {imageUrl && (
              <IconButton
                color="error"
                onClick={handleDelete}
                sx={{ mt: 1 }}
              >
                <Delete />
              </IconButton>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ImageUploader; 