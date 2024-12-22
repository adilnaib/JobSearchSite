// src/App.js
import React from "react";
import "./App.css";
import Header from "./components/Header"; // Import Header component
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import the pages for Employer and Job Seeker Dashboards
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard/JobSeekerDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Display the Header */}
        <h2>Welcome to the Interview Scheduler</h2>
        {/* Define Routes */}
        <Routes>
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/jobseeker" element={<JobSeekerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
