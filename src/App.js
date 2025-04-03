import React, { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import useRouter from './router';
import AuthContext from './store/auth-context';

const App = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  // when the website is loaded or reloaded, this code checkes for authentication
  if (authCtx.isCheckingAuth) {
    return <div>Loading...</div>; // ✅ Prevent rendering until auth check is complete
  }
  return <RouterProvider router={router} />;
};

export default App;