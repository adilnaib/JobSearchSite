import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'Job Seeker' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.register(form);
      const redirectPath =
        form.role === 'Employer'
          ? 'http://localhost:9090/employer/register'
          : 'http://localhost:9090/jobseeker/register';
      window.location.href = redirectPath;
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
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
        <button onClick={handleSubmit}>Register</button>
        <p className="auth-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;