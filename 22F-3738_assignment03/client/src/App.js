import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/student/Dashboard';
import TutorDashboard from './pages/tutor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

// Import components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 