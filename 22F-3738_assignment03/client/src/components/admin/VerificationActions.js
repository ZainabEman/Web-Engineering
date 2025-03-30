import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const VerificationActions = ({ verification, onApprove, onReject }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(null);
  const [comment, setComment] = useState('');

  const handleAction = (type) => {
    setAction(type);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (action === 'approve') {
      onApprove(verification._id, comment);
    } else {
      onReject(verification._id, comment);
    }
    setOpenDialog(false);
    setComment('');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Verification Actions
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircle />}
          onClick={() => handleAction('approve')}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Cancel />}
          onClick={() => handleAction('reject')}
        >
          Reject
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {action === 'approve' ? 'Approve Tutor' : 'Reject Tutor'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comments"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            color={action === 'approve' ? 'success' : 'error'}
            variant="contained"
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default VerificationActions; 