import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const GuestRoute: React.FC<{ redirectTo?: string }> = ({
  redirectTo = '/dashboard',
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
