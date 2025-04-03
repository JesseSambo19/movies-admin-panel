import React, { useContext } from 'react';
import useProfileApi from '../services/profile-api';

const ProfileContext = React.createContext({
  onFetchUserProfile: (dispatchName, dispatchEmail) => {},
  onUpdateUserProfile: (name, email) => {},
  onUpdateUserPassword: (
    currentPassword,
    newPassword,
    confirmNewPassword,
    dispatchCurrentPassword,
    dispatchNewPassword,
    dispatchConfirmNewPassword
  ) => {},
  onDeleteUserAccount: () => {},
});

export const ProfileContextProvider = (props) => {
  const  { deleteUserAccount, updateUserPassword } = useProfileApi();
  const fetchUserProfileHandler = async (dispatchName, dispatchEmail) => {
    fetchUserProfileHandler(dispatchName, dispatchEmail);
  };

  const updateUserProfileHandler = async (name, email) => {
    updateUserProfileHandler(name, email);
  };

  const updateUserPasswordHandler = async (
    currentPassword,
    newPassword,
    confirmNewPassword,
    dispatchCurrentPassword,
    dispatchNewPassword,
    dispatchConfirmNewPassword
  ) => {
    updateUserPassword(
      currentPassword,
      newPassword,
      confirmNewPassword,
      dispatchCurrentPassword,
      dispatchNewPassword,
      dispatchConfirmNewPassword
    );
  };

  const deleteUserAccountHandler = async (closeModal) => {
    deleteUserAccount(closeModal);
  };

  return (
    <ProfileContext.Provider
      value={{
        onFetchUserProfile: fetchUserProfileHandler, // Provide pathName from useRef
        onUpdateUserProfile: updateUserProfileHandler,
        onUpdateUserPassword: updateUserPasswordHandler,
        onDeleteUserAccount: deleteUserAccountHandler,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

// export default ProfileContext;

export function useProfile() {
  return useContext(ProfileContext);
}