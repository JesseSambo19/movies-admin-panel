import React from 'react';
import { RouterProvider } from 'react-router-dom';
import useRouter from './router';
import { useAuth } from './store/auth-context';
import GlobalLoadingSpinner from './components/GlobalLoadingSpinner/GlobalLoadingSpinner';

const App = () => {
  const router = useRouter();
  const authCtx = useAuth();

  // when the website is loaded or reloaded, this code checkes for authentication
  if (authCtx.isCheckingAuth) {
    return; // ✅ Prevent rendering until auth check is complete
  }

  return (
    <React.Fragment>
      <GlobalLoadingSpinner /> {/* Spinner visible when loading */}
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
