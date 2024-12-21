import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Chip,
  Stack,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { employerService } from '../../services/api';

const JobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    requiredSkills: [],
    newSkill: ''
  });
  const [error, setError] = useState('');
  const empId = 1; // Replace with actual employer ID from context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, formData.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        salary: parseFloat(formData.salary),
        location: formData.location,
        requiredSkills: formData.requiredSkills
      };
      await employerService.postJob(empId, jobData);
      navigate('/jobs');
    } catch (err) {
      setError('Failed to create job posting. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Job Posting
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="title"
              label="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="Job Description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              name="salary"
              label="Salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              required
              fullWidth
            />
            <Box>
              <TextField
                name="newSkill"
                label="Add Required Skill"
                value={formData.newSkill}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddSkill}
                sx={{ mb: 2 }}
              >
                Add Skill
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.requiredSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Job
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/jobs')}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default JobForm;
