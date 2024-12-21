import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, Box, Typography 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { employerService } from '../../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const empId = 1; // Replace with actual employer ID from auth context

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await employerService.getJobs(empId);
      setJobs(response.data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await employerService.deleteJob(jobId);
        loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Job Listings</Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/jobs/new')}
        >
          Post New Job
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Required Skills</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.jobId}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.requiredSkills?.join(', ')}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      color="primary"
                      onClick={() => navigate(`/jobs/${job.jobId}`)}
                    >
                      View
                    </Button>
                    <Button 
                      color="error"
                      onClick={() => handleDeleteJob(job.jobId)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobList;
