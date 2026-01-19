import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainApp from './MainApp';
import { useAuth } from './contexts/AuthContext';
import { isAuthenticated } from './services/authService';

const App: React.FC = () => {
  const { isAuth } = useAuth();
  // Check both context and localStorage for reliability
  const authenticated = isAuth || isAuthenticated();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/signin" 
        element={authenticated ? <Navigate to="/" replace /> : <SignIn />} 
      />
      <Route 
        path="/signup" 
        element={authenticated ? <Navigate to="/" replace /> : <SignUp />} 
      />
      
      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;