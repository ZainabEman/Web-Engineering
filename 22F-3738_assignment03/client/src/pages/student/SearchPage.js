import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import TutorCard from '../../components/tutors/TutorCard';
import FilterForm from '../../components/tutors/FilterForm';

const SearchPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    priceRange: 'any',
    minRating: 0,
    availability: 'any',
  });

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/student/search`, {
        params: filters,
      });
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      subject: '',
      location: '',
      priceRange: 'any',
      minRating: 0,
      availability: 'any',
    });
  };

  const handleWishlistToggle = async (tutorId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/student/wishlist/toggle`, {
        tutorId,
      });
      // Update local state or show success message
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      // Handle error appropriately
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterForm
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </Grid>
        
        <Grid item xs={12} md={9}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : tutors.length === 0 ? (
            <Typography variant="h6" align="center" color="text.secondary">
              No tutors found matching your criteria
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {tutors.map((tutor) => (
                <Grid item xs={12} sm={6} md={4} key={tutor._id}>
                  <TutorCard
                    tutor={tutor}
                    isWishlisted={tutor.isWishlisted}
                    onWishlistToggle={handleWishlistToggle}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage; 