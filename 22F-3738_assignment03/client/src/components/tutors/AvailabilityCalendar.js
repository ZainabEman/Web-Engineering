import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';

const timeSlots = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Evening', value: 'evening' },
];

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const AvailabilityCalendar = ({ availability, onChange, isPreview }) => {
  const handleChange = (day, timeSlot) => (event) => {
    if (isPreview) return;
    
    onChange({
      ...availability,
      [day]: {
        ...availability[day],
        [timeSlot]: event.target.checked,
      },
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Weekly Availability
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ width: '100px' }}>Day</Typography>
            {timeSlots.map((slot) => (
              <Typography key={slot.value} variant="subtitle1" sx={{ flex: 1, textAlign: 'center' }}>
                {slot.label}
              </Typography>
            ))}
          </Box>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        {days.map((day) => (
          <Grid item xs={12} key={day}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ width: '100px' }}>{day}</Typography>
              <FormGroup row sx={{ flex: 1 }}>
                {timeSlots.map((slot) => (
                  <FormControlLabel
                    key={`${day}-${slot.value}`}
                    control={
                      <Checkbox
                        checked={availability[day]?.[slot.value] || false}
                        onChange={handleChange(day, slot.value)}
                        disabled={isPreview}
                      />
                    }
                    sx={{ flex: 1, justifyContent: 'center' }}
                  />
                ))}
              </FormGroup>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AvailabilityCalendar; 