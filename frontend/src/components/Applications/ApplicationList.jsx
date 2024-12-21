import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Alert
} from '@mui/material';
import { employerService } from '../../services/api';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const empId = 1; // Replace with actual employer ID from context

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const response = await employerService.getApplications(empId);
      setApplications(response.data);
      setError('');
    } catch (error) {
      console.error('Error loading applications:', error);
      setError('Failed to load applications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await employerService.updateApplicationStatus(applicationId, newStatus);
      loadApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Failed to update application status. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Job Applications
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.applicationId}>
                <TableCell>{application.job.title}</TableCell>
                <TableCell>{application.seeker.name}</TableCell>
                <TableCell>{application.seeker.email}</TableCell>
                <TableCell>
                  <FormControl size="small">
                    <Select
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.applicationId, e.target.value)}
                    >
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="REVIEWING">Reviewing</MenuItem>
                      <MenuItem value="ACCEPTED">Accepted</MenuItem>
                      <MenuItem value="REJECTED">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {new Date(application.applicationDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {applications.length === 0 && !error && (
        <Typography sx={{ mt: 2, textAlign: 'center' }} color="textSecondary">
          No applications found
        </Typography>
      )}
    </Box>
  );
};

export default ApplicationList;
