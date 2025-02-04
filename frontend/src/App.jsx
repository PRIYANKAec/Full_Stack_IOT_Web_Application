import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home'
import Navbar from './components/navbar'
import Login from './pages/Auth/Login'
import './styles/index.css';
import { isAuthenticated } from './utils/auth';
import Register from './pages/Auth/Register';

function App() {

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbarRoutes = ['/login', '/register'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
      </Routes>
    </>
  );
};

export default App