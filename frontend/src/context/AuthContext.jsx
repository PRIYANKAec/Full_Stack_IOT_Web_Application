import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/auth';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await api.post('/api/users/me');
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Failed to get user details:', error);
      setError('Failed: ' + error?.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/api/users/signin', userData);
      saveToken(response.data.data.token);
      fetchUserData(response.data.data.token);
      setError(null);
    } catch (error) {
      console.error('Login failed:', error);
      if(error?.message) setError(error.message);
      if(error?.response?.data?.message) {
      setError((error?.response?.data?.message + ": " + error.response?.data?.data) || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/api/users/register', userData);
      saveToken(response.data.data.token);
      fetchUserData(response.data.data.token);
      setError(null);
    } catch (error) {
      console.error('Registration failed:', error);
      if(error?.message) setError(error.message);
      if(error?.response?.data?.message) 
      setError((error?.response?.data?.message + ": " + error.response?.data?.data) || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);