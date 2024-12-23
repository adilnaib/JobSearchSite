import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import InterviewService from './interviewService';

const CreateInterviewForm = ({ onInterviewCreated, jobApplicationId, onClose, initialData, isEditing }) => {
  const [formData, setFormData] = useState(initialData || {
    date: '',
    time: '',
    location: '',
    meetingLink: '',
    panelMembers: '',
    interviewMode: 'ONLINE',
    interviewType: 'TECHNICAL',
    instructions: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['date', 'time', 'panelMembers', 'interviewMode', 'interviewType'];
    
    if (formData.interviewMode === 'OFFLINE' && !formData.location) {
      setError('Location is required for offline interviews');
      return false;
    }
    
    if (formData.interviewMode === 'ONLINE' && !formData.meetingLink) {
      setError('Meeting link is required for online interviews');
      return false;
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      console.log('Submitting interview with data:', formData);

      if (isEditing) {
        await InterviewService.rescheduleInterview(initialData.interviewId, formData);
        setShowSuccessMessage(true);
      } else {
        await InterviewService.createInterview(formData, jobApplicationId);
        setShowSuccessMessage(true);
      }

      // Wait for a short delay to show the success message before closing
      setTimeout(() => {
        onInterviewCreated(formData);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error creating interview:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccessMessage(false);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create Interview</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Interview Mode</InputLabel>
                <Select
                  name="interviewMode"
                  value={formData.interviewMode}
                  onChange={handleInputChange}
                >
                  <MenuItem value="ONLINE">Online</MenuItem>
                  <MenuItem value="OFFLINE">Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Interview Type</InputLabel>
                <Select
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleInputChange}
                >
                  <MenuItem value="TECHNICAL">Technical</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="MANAGERIAL">Managerial</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData.interviewMode === 'OFFLINE' ? (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meeting Link"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Panel Members"
                name="panelMembers"
                value={formData.panelMembers}
                onChange={handleInputChange}
                required
                helperText="Enter panel members' names separated by commas"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {isEditing ? 'Update Interview' : 'Schedule Interview'}
            </Button>
          </Box>

          <Snackbar
            open={showSuccessMessage}
            autoHideDuration={1500}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {isEditing ? 'Interview updated successfully!' : 'Interview scheduled successfully!'}
            </Alert>
          </Snackbar>
        </form>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default CreateInterviewForm;
