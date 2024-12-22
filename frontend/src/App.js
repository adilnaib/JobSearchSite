import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AddDetailsJobSeeker from "./components/JobSeeker/AddDetails";
import AddDetailsEmployer from "./components/Employer/AddDetails";
import EmployerDashboard from "./components/Employer/Dashboard";
import JobSeekerDashboard from "./components/JobSeeker/Dashboard";
import EmployerProfile from "./components/Employer/Profile";
import JobSeekerProfile from "./components/JobSeeker/Profile";
import PostJob from "./components/Employer/PostJob";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import InterviewDashboard from "./components/Interview/JobSeekerDashboard"; // Correct import path

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
        <Route
          path="/jobseeker/dashboard"
          element={
            <ProtectedRoute>
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/profile"
          element={
            <ProtectedRoute>
              <EmployerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobseeker/profile"
          element={
            <ProtectedRoute>
              <JobSeekerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-dashboard"
          element={
            <ProtectedRoute>
              <InterviewDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
