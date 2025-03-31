import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Navigate, Outlet } from 'react-router-dom';

const VerifiedRoute = () => {
  const authCtx = useContext(AuthContext);

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
