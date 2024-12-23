import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Paper
} from '@mui/material';
import CreateInterviewForm from './CreateInterviewForm';
import InterviewList from './InterviewList';

const EmployerDashboard = ({ employerId, jobApplicationId }) => {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleScheduleInterview = () => {
    setIsScheduleDialogOpen(true);
  };

  const handleViewDetails = (interview) => {
    setSelectedInterview(interview);
    setIsViewDetailsOpen(true);
  };

  const handleInterviewCreated = (interviewData) => {
    setIsScheduleDialogOpen(false);
    // You might want to refresh the interview list here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Interview Management</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleInterview}
          >
            Schedule Interview
          </Button>
        </Box>

        <InterviewList 
          employerId={employerId}
          jobApplicationId={jobApplicationId}
          onViewDetails={handleViewDetails}
        />
      </Paper>

      {/* Schedule Interview Dialog */}
      <Dialog 
        open={isScheduleDialogOpen} 
        onClose={() => setIsScheduleDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Schedule New Interview</DialogTitle>
        <DialogContent>
          <CreateInterviewForm
            jobApplicationId={jobApplicationId}
            onInterviewCreated={handleInterviewCreated}
            onClose={() => setIsScheduleDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog 
        open={isViewDetailsOpen} 
        onClose={() => setIsViewDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Interview Details</DialogTitle>
        <DialogContent>
          {selectedInterview && (
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Date:</strong> {selectedInterview.date}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Time:</strong> {selectedInterview.time}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Mode:</strong> {selectedInterview.interviewMode}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Type:</strong> {selectedInterview.interviewType}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>{selectedInterview.interviewMode === 'ONLINE' ? 'Meeting Link' : 'Location'}:</strong>{' '}
                {selectedInterview.interviewMode === 'ONLINE' ? selectedInterview.meetingLink : selectedInterview.location}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Panel Members:</strong> {selectedInterview.panelMembers}
              </Typography>
              {selectedInterview.instructions && (
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Instructions:</strong> {selectedInterview.instructions}
                </Typography>
              )}
              <Typography variant="subtitle1" gutterBottom>
                <strong>Status:</strong> {selectedInterview.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewDetailsOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployerDashboard;
