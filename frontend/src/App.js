import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddDetailsJobSeeker from './components/JobSeeker/AddDetails';
import AddDetailsEmployer from './components/Employer/AddDetails';
import EmployerDashboard from "./components/Employer/Dashboard";
import PostJob from './components/Employer/PostJob';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobseeker/add-details" element={<AddDetailsJobSeeker />} />
          <Route path="/employer/add-details" element={<AddDetailsEmployer />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/post-job" element={<PostJob />} />
        </Routes>
      </Router>
  );
};

export default App;
