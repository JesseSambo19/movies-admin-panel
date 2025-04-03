import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
  return (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default Redirect;
