import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Auth.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'Job Seeker' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = await api.login(form);
      if (form.role === 'Job Seeker') {
        window.location.href = 'http://localhost:9090/jobseeker/viewAllJobs';
      } else if (form.role === 'Employer') {
        window.location.href = `http://localhost:9090/employer/${data.empId}`;
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Log In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Job Seeker">Job Seeker</option>
          <option value="Employer">Employer</option>
        </select>
        <button onClick={handleSubmit}>Log In</button>
        <p className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;