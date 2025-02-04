import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home'
import Navbar from './components/navbar'
import Login from './pages/Auth/Login'
import './styles/index.css';
import { isAuthenticated } from './utils/auth';

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            !!isAuthenticated() ? <Home /> : <Navigate to="/login" />}               
            />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App