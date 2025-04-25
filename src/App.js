import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import useRouter from './router';
import { useAuth } from './store/auth-context';
import GlobalLoadingSpinner from './components/GlobalLoadingSpinner/GlobalLoadingSpinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const router = useRouter();
  const authCtx = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // when the website is loaded or reloaded, this code checkes for authentication
  if (authCtx.isCheckingAuth) {
    return; // ✅ Prevent rendering until auth check is complete
  }

  return (
    <React.Fragment>
      {authCtx.isLoggedIn && authCtx.isVerified && <GlobalLoadingSpinner />}{' '}
      {/* Spinner visible when loading */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastStyle={{
          width: isMobile && '90%',
          borderRadius: isMobile && '8px',
        }}
      />
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
