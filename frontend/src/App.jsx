import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './styles/index.css';
import Sidebar from './components/sidebar';
import StudentHome from './pages/Student/StudentHome';
import LiveTracking from './pages/Student/LiveTracking';
import Projects from './pages/Student/Projects';
import Header from './components/header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();

  const hideNavbarRoutes = ['/login', '/register'];

  return (
    <div className='flex will-change-transform-opacity'>
      {!hideNavbarRoutes.includes(location.pathname) && <Sidebar />}
      <div className='w-full'>
      <div className='flex flex-col'>
      {!hideNavbarRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={user ? "/" : '/login'} />} />
          <Route path="/studentHome" element={<StudentHome />} />
          <Route path="/liveTracking" element={<LiveTracking />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;