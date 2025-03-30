import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TutorCard = ({ tutor, isWishlisted, onWishlistToggle }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={tutor.profileImage || '/images/default-avatar.png'}
        alt={tutor.name}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            {tutor.name}
          </Typography>
          <IconButton onClick={() => onWishlistToggle(tutor._id)}>
            {isWishlisted ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {tutor.subjects.join(', ')}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={tutor.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({tutor.reviewCount} reviews)
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {tutor.location}
        </Typography>

        <Typography variant="h6" color="primary" gutterBottom>
          Rs. {tutor.hourlyRate}/hour
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/tutor/${tutor._id}`)}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default TutorCard; 