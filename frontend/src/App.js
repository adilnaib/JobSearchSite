import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddDetailsJobSeeker from './components/JobSeeker/AddDetails';
import AddDetailsEmployer from './components/Employer/AddDetails';
import EmployerDashboard from "./components/Employer/Dashboard";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/jobseeker/add-details" 
          element={
            <ProtectedRoute>
              <AddDetailsJobSeeker />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/add-details" 
          element={
            <ProtectedRoute>
              <AddDetailsEmployer />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer/dashboard" 
          element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
