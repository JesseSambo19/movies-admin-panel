import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import AppContextProvider from './store/app-context-provider';

// Disable console logs in production
if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
  // You can leave console.error active if needed
  // console.error = function () {};
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
