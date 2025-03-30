import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import ProfileForm from '../../components/tutors/ProfileForm';
import SubjectsSelector from '../../components/tutors/SubjectsSelector';
import AvailabilityCalendar from '../../components/tutors/AvailabilityCalendar';
import ImageUploader from '../../components/tutors/ImageUploader';

const TutorProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tutor/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (values) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tutor/profile`, values);
      setProfile({ ...profile, ...values });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSubjectsChange = async (subjects) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tutor/profile`, {
        subjects,
      });
      setProfile({ ...profile, subjects });
    } catch (error) {
      console.error('Error updating subjects:', error);
    }
  };

  const handleAvailabilityChange = async (availability) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tutor/profile`, {
        availability,
      });
      setProfile({ ...profile, availability });
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleImageChange = async (imageUrl) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/tutor/profile`, {
        profileImage: imageUrl,
      });
      setProfile({ ...profile, profileImage: imageUrl });
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Tutor Profile</Typography>
        <Button
          variant="contained"
          onClick={() => setPreviewMode(!previewMode)}
        >
          {previewMode ? 'Edit Mode' : 'Preview Mode'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ImageUploader
            imageUrl={profile?.profileImage}
            onImageChange={handleImageChange}
            isPreview={previewMode}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Basic Info" />
            <Tab label="Subjects" />
            <Tab label="Availability" />
          </Tabs>

          {activeTab === 0 && (
            <ProfileForm
              initialValues={profile}
              onSubmit={handleProfileUpdate}
              isPreview={previewMode}
            />
          )}

          {activeTab === 1 && (
            <SubjectsSelector
              selectedSubjects={profile?.subjects || []}
              onChange={handleSubjectsChange}
              isPreview={previewMode}
            />
          )}

          {activeTab === 2 && (
            <AvailabilityCalendar
              availability={profile?.availability || {}}
              onChange={handleAvailabilityChange}
              isPreview={previewMode}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TutorProfilePage; 