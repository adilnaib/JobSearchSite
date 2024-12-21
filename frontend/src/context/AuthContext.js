import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (employerData) => {
    try {
      setLoading(true);
      setError(null);
      // Here you would typically make an API call to authenticate
      // For now, we'll just set the employer data directly
      setEmployer(employerData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setEmployer(null);
    setError(null);
  };

  const value = {
    employer,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!employer
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
