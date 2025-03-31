import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
  return (
    <Navigate
      to="/send-verification-email"
      replace
    />
  );
};

export default Redirect;
