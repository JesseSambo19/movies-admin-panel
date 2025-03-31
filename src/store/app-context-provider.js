import React from 'react';
import { AuthContextProvider } from './auth-context';
import { ProfileContextProvider } from './profile-context';

// this component will serve to be the main app provider which will wrap all providers of its child
// this will make code cleaner when importing providers in index.js

const AppContextProvider = (props) => {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>{props.children}</ProfileContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;
