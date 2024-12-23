import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InterviewService from './interviewService';
import CreateInterviewForm from './CreateInterviewForm';

const InterviewList = ({ employerId, seekerId, jobApplicationId }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      let fetchedInterviews;
      
      if (employerId) {
        fetchedInterviews = await InterviewService.getInterviewsByEmployerId(employerId);
      } else if (seekerId) {
        fetchedInterviews = await InterviewService.getInterviewsBySeekerId(seekerId);
      } else if (jobApplicationId) {
        fetchedInterviews = await InterviewService.getInterviewsByJobApplicationId(jobApplicationId);
      }

      setInterviews(fetchedInterviews);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching interviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [employerId, seekerId, jobApplicationId]);

  const handleEdit = (interview) => {
    setSelectedInterview(interview);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (interview) => {
    setSelectedInterview(interview);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateInterview = async (updatedData) => {
    try {
      await InterviewService.rescheduleInterview(selectedInterview.interviewId, updatedData);
      setIsEditDialogOpen(false);
      fetchInterviews(); // Refresh the list
    } catch (err) {
      console.error('Error updating interview:', err);
      setError(err.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await InterviewService.cancelInterview(selectedInterview.interviewId);
      setIsDeleteDialogOpen(false);
      fetchInterviews(); // Refresh the list
    } catch (err) {
      console.error('Error cancelling interview:', err);
      setError(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'SCHEDULED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      case 'COMPLETED':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) return <Typography>Loading interviews...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location/Link</TableCell>
              <TableCell>Panel Members</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((interview) => (
              <TableRow key={interview.interviewId}>
                <TableCell>{interview.date}</TableCell>
                <TableCell>{interview.time}</TableCell>
                <TableCell>{interview.interviewMode}</TableCell>
                <TableCell>{interview.interviewType}</TableCell>
                <TableCell>
                  {interview.interviewMode === 'ONLINE' ? interview.meetingLink : interview.location}
                </TableCell>
                <TableCell>{interview.panelMembers}</TableCell>
                <TableCell>
                  <Chip 
                    label={interview.status} 
                    color={getStatusColor(interview.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleEdit(interview)}
                    disabled={interview.status === 'CANCELLED'}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(interview)}
                    disabled={interview.status === 'CANCELLED'}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Update Interview</DialogTitle>
        <DialogContent>
          {selectedInterview && (
            <CreateInterviewForm
              initialData={selectedInterview}
              onInterviewCreated={(updatedData) => handleUpdateInterview(updatedData)}
              onClose={() => setIsEditDialogOpen(false)}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Cancel Interview</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this interview? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>No, Keep It</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Yes, Cancel Interview
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InterviewList;
