import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { employerService } from '../../services/api';

const SeekerList = () => {
  const [searchSkill, setSearchSkill] = useState('');
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (searchSkill.trim()) {
      try {
        setLoading(true);
        setError('');
        const response = await employerService.searchJobSeekersBySkill([searchSkill]);
        setSeekers(response.data);
      } catch (error) {
        console.error('Error searching job seekers:', error);
        setError('Failed to search job seekers. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Search Job Seekers
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search by Skill"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            placeholder="Enter a skill (e.g., Java, React, Python)"
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ minWidth: '120px' }}
            disabled={loading || !searchSkill.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {seekers.map((seeker) => (
          <Grid item xs={12} md={6} lg={4} key={seeker.jsId}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {seeker.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {seeker.email}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Skills:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {seeker.jsSkills?.map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill} 
                      size="small"
                      color={skill.toLowerCase() === searchSkill.toLowerCase() ? 'primary' : 'default'}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {seekers.length === 0 && searchSkill && !loading && !error && (
        <Typography sx={{ mt: 2, textAlign: 'center' }} color="textSecondary">
          No job seekers found with the specified skill
        </Typography>
      )}
    </Box>
  );
};

export default SeekerList;
