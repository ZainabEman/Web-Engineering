import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
} from '@mui/material';

const TutorDetailView = ({ verification }) => {
  const tutor = verification.tutor;

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={tutor.profileImage}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h5" gutterBottom>
            {tutor.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {tutor.email}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Location"
                secondary={tutor.location}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Hourly Rate"
                secondary={`Rs. ${tutor.hourlyRate}/hour`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Education"
                secondary={tutor.education}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Experience"
                secondary={tutor.experience}
              />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Subjects Taught
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tutor.subjects.map((subject) => (
              <Chip
                key={subject}
                label={subject}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Bio
          </Typography>
          <Typography variant="body1" paragraph>
            {tutor.bio}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Submitted Documents
          </Typography>
          <List>
            {verification.documents.map((doc, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={doc.type}
                  secondary={
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TutorDetailView; 