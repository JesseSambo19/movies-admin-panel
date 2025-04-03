import React from 'react';
import { useAuth } from '../store/auth-context';
import { Navigate, Outlet } from 'react-router-dom';

const VerifiedRoute = () => {
  const authCtx = useAuth();

  if (authCtx.isCheckingAuth) {
    return <div>Loading...</div>; // ✅ Prevent rendering until auth check is complete
  }
  return authCtx.isVerified ? (
    <Outlet />
  ) : (
    <Navigate
      to="/send-verification-email"
      replace
    />
  );
};

export default VerifiedRoute;
