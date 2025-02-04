import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/auth';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/api/users/signin', userData);
      saveToken(response.data.data.token);
      const user = response.data.data.user;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setError(null);
    } catch (error) {
      console.error('Login failed:', error);
      setError((error.response?.data?.message + ": " + error.response?.data?.data) || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/api/users/register', userData);
      saveToken(response.data.data.token);
      const newUser = response.data.data.newUser;
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setError(null);
    } catch (error) {
      console.error('Registration failed:', error);
      setError((error.response?.data?.message + ": " + error.response?.data?.data) || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, registerUser, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);