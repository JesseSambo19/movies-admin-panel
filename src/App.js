import React, { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import AuthContext from './store/auth-context';

const App = () => {
  const authCtx = useContext(AuthContext);

  if (authCtx.isCheckingAuth) {
    return <div>Loading...</div>; // ✅ Prevent rendering until auth check is complete
  }
  return <RouterProvider router={router} />;
};

export default App;
