import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import JobList from './components/Jobs/JobList';
import JobForm from './components/Jobs/JobForm';
import JobDetails from './components/Jobs/JobDetails';
import ApplicationList from './components/Applications/ApplicationList';
import SeekerList from './components/Seekers/SeekerList';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import JobSeekerDashboard from './components/Dashboard/JobSeekerDashboard';
import HomePage from './components/HomePage';
import RegisterDetails from './components/Auth/RegisterDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/new" element={<JobForm />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/seekers" element={<SeekerList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
          <Route path="/register-details" element={<RegisterDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
