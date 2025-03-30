import React from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  TextareaAutosize,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required').min(50, 'Bio must be at least 50 characters'),
  education: Yup.string().required('Education details are required'),
  experience: Yup.string().required('Experience details are required'),
  hourlyRate: Yup.number()
    .required('Hourly rate is required')
    .min(100, 'Minimum rate is Rs. 100')
    .max(5000, 'Maximum rate is Rs. 5000'),
  location: Yup.string().required('Location is required'),
});

const ProfileForm = ({ initialValues, onSubmit, isPreview }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      bio: '',
      education: '',
      experience: '',
      hourlyRate: '',
      location: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isPreview ? 'Profile Preview' : 'Edit Profile'}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              disabled={isPreview}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Bio
            </Typography>
            <TextareaAutosize
              id="bio"
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              disabled={isPreview}
              style={{ width: '100%', minHeight: '100px' }}
              placeholder="Tell students about yourself..."
            />
            {formik.touched.bio && formik.errors.bio && (
              <Typography color="error" variant="caption">
                {formik.errors.bio}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="education"
              name="education"
              label="Education"
              value={formik.values.education}
              onChange={formik.handleChange}
              error={formik.touched.education && Boolean(formik.errors.education)}
              helperText={formik.touched.education && formik.errors.education}
              disabled={isPreview}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="experience"
              name="experience"
              label="Experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              error={formik.touched.experience && Boolean(formik.errors.experience)}
              helperText={formik.touched.experience && formik.errors.experience}
              disabled={isPreview}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="hourlyRate"
              name="hourlyRate"
              label="Hourly Rate (Rs.)"
              type="number"
              value={formik.values.hourlyRate}
              onChange={formik.handleChange}
              error={formik.touched.hourlyRate && Boolean(formik.errors.hourlyRate)}
              helperText={formik.touched.hourlyRate && formik.errors.hourlyRate}
              disabled={isPreview}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              disabled={isPreview}
            />
          </Grid>

          {!isPreview && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={formik.handleReset}>
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formik.isSubmitting}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default ProfileForm; 