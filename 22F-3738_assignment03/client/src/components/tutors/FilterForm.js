import React from 'react';
import {
  Paper,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
} from '@mui/material';

const FilterForm = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (field) => (event) => {
    onFilterChange(field, event.target.value);
  };

  const handleSliderChange = (field) => (event, newValue) => {
    onFilterChange(field, newValue);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Tutors
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Subject"
          value={filters.subject}
          onChange={handleChange('subject')}
          fullWidth
        />

        <TextField
          label="Location"
          value={filters.location}
          onChange={handleChange('location')}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Price Range</InputLabel>
          <Select
            value={filters.priceRange}
            label="Price Range"
            onChange={handleChange('priceRange')}
          >
            <MenuItem value="0-500">Under Rs. 500</MenuItem>
            <MenuItem value="500-1000">Rs. 500 - Rs. 1000</MenuItem>
            <MenuItem value="1000-2000">Rs. 1000 - Rs. 2000</MenuItem>
            <MenuItem value="2000+">Above Rs. 2000</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Typography gutterBottom>Minimum Rating</Typography>
          <Slider
            value={filters.minRating}
            onChange={handleSliderChange('minRating')}
            min={0}
            max={5}
            step={0.5}
            marks
          />
          <Typography variant="body2" color="text.secondary">
            {filters.minRating} stars
          </Typography>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Availability</InputLabel>
          <Select
            value={filters.availability}
            label="Availability"
            onChange={handleChange('availability')}
          >
            <MenuItem value="any">Any Time</MenuItem>
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="afternoon">Afternoon</MenuItem>
            <MenuItem value="evening">Evening</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={onReset}
          sx={{ mt: 1 }}
        >
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterForm; 