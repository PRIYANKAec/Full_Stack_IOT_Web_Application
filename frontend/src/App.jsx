import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import './styles/index.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from 'sonner';

import Sidebar from './components/sidebar';
import Header from './components/header';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

import Projects from './pages/Student/Projects';
import LiveTracking from './pages/Student/LiveTracking';
import Tutorial from './pages/Student/Tutorial';

import AllTracking from './pages/Admin/allTracking';
import ManageProject from './pages/Admin/manageProject';
import ManageUser from './pages/Admin/manageUser';

const App = () => {
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
        <Toaster />
        <SonnerToaster position="top-center" expand={false} richColors className='z-[150]' />
        <div className='flex flex-col h-full'>
          {!hideNavbarRoutes.includes(location.pathname) && <Header />}
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to={user ? "/" : '/login'} />} />

            <Route path="/profile" element={!user ? <Navigate to="/login" /> : <Profile />} />

            <Route path="/home" element={<Home />} />

            <Route path="/projects" element={
              <ProtectedRoute element={<Projects />} allowedRoles={["USER"]} />
            } />
            <Route path="/liveTracking/:projectId" element={
              <ProtectedRoute element={<LiveTracking />} allowedRoles={["USER"]} />
            } />
            <Route path="/tutorial" element={
              <ProtectedRoute element={<Tutorial />} allowedRoles={["USER"]} />
            } />

            <Route path="/manageProject" element={
              <ProtectedRoute element={<ManageProject />} allowedRoles={["ADMIN"]} />
            } />
            <Route path="/manageUser" element={
              <ProtectedRoute element={<ManageUser />} allowedRoles={["ADMIN"]} />
            } />
            <Route path="/allTracking" element={
              <ProtectedRoute element={<AllTracking />} allowedRoles={["ADMIN"]} />
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;