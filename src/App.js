import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router'

const App = () => {
  // const authCtx = useContext(AuthContext);

  // if (authCtx.isCheckingAuth) {
  //   return <div>Loading...</div>; // ✅ Prevent rendering until auth check is complete
  // }
  return <RouterProvider router={router} />;
};

export default App;
