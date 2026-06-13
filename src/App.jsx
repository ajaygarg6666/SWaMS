import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import ControlPanel from './pages/ControlPanel';
import Encyclopedia from './pages/Encyclopedia';

// Route Guard that redirects unauthenticated users to the Landing Page gate
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AppContextProvider>
      <Routes>
        {/* Public Landing & Authentication Gateway */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authenticated Operator Workspace Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/onboarding" 
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/control" 
          element={
            <ProtectedRoute>
              <ControlPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/encyclopedia" 
          element={
            <ProtectedRoute>
              <Encyclopedia />
            </ProtectedRoute>
          } 
        />

        {/* Fallback Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
