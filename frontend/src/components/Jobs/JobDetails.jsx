import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { employerService } from '../../services/api';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const empId = 1; // Replace with actual employer ID from context

  useEffect(() => {
    loadJobDetails();
    loadApplicants();
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      const response = await employerService.getJobDetails(empId, jobId);
      setJob(response.data);
    } catch (error) {
      console.error('Error loading job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadApplicants = async () => {
    try {
      const response = await employerService.getJobSeekersByJob(jobId);
      setApplicants(response.data);
    } catch (error) {
      console.error('Error loading applicants:', error);
    }
  };

  const handleDeleteJob = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await employerService.deleteJob(jobId);
        navigate('/jobs');
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Job not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Location: {job.location}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Salary: ${job.salary}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>
              {job.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Required Skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {job.requiredSkills?.map((skill, index) => (
                <Chip key={index} label={skill} />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Applicants ({applicants.length})
            </Typography>
            <List>
              {applicants.map((applicant) => (
                <ListItem key={applicant.jsId}>
                  <ListItemText
                    primary={applicant.name}
                    secondary={`Email: ${applicant.email}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate(`/jobs/edit/${jobId}`)}
              >
                Edit Job
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteJob}
              >
                Delete Job
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/jobs')}
              >
                Back to Jobs
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default JobDetails;
