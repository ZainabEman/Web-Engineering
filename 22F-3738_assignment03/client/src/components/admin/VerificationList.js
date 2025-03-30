import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

const VerificationList = ({ verifications, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Pending Verifications
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tutor Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Submitted Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verifications.map((verification) => (
              <TableRow key={verification._id}>
                <TableCell>{verification.tutor.name}</TableCell>
                <TableCell>{verification.tutor.email}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {verification.tutor.subjects.map((subject) => (
                      <Chip
                        key={subject}
                        label={subject}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{verification.tutor.location}</TableCell>
                <TableCell>
                  {new Date(verification.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={verification.status}
                    color={getStatusColor(verification.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onViewDetails(verification)}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default VerificationList; 