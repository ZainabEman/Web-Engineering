import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import VerificationList from '../../components/admin/VerificationList';
import TutorDetailView from '../../components/admin/TutorDetailView';
import VerificationActions from '../../components/admin/VerificationActions';

const VerificationDashboard = () => {
  const [verifications, setVerifications] = useState([]);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/verification`);
      setVerifications(response.data);
    } catch (error) {
      console.error('Error fetching verifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (verification) => {
    setSelectedVerification(verification);
    setActiveTab(1);
  };

  const handleApprove = async (verificationId, comment) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/verification/${verificationId}/approve`, {
        comment,
      });
      fetchVerifications();
      setSelectedVerification(null);
      setActiveTab(0);
    } catch (error) {
      console.error('Error approving verification:', error);
    }
  };

  const handleReject = async (verificationId, comment) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/verification/${verificationId}/reject`, {
        comment,
      });
      fetchVerifications();
      setSelectedVerification(null);
      setActiveTab(0);
    } catch (error) {
      console.error('Error rejecting verification:', error);
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
      <Typography variant="h4" gutterBottom>
        Tutor Verification Dashboard
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Verification List" />
        <Tab label="Tutor Details" disabled={!selectedVerification} />
      </Tabs>

      {activeTab === 0 ? (
        <VerificationList
          verifications={verifications}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TutorDetailView verification={selectedVerification} />
          </Grid>
          <Grid item xs={12} md={4}>
            <VerificationActions
              verification={selectedVerification}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default VerificationDashboard; 