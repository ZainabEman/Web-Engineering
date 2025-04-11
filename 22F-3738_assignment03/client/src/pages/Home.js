import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 4
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to EduConnect
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Connect with expert tutors and enhance your learning experience
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="outlined"
            size="large"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 