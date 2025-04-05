import { useCallback } from 'react';
import { useLoading } from '../store/loading-context';
import axiosInstance from '../utils/axios';
import { handleAxiosError } from '../utils/handleAxiosError';

const useProfileApi = () => {
  const { setLoading } = useLoading();
  const fetchUserProfile = useCallback(
    async (dispatchName, dispatchEmail) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('profile');
        const { name = '', email = '' } = response.data || {};

        dispatchName({ type: 'USER_INPUT', val: name });
        dispatchEmail({ type: 'USER_INPUT', val: email });
      } catch (error) {
        handleAxiosError(error);
        console.error(error.response?.data || error.message);
      }
      setLoading(false);
    },
    [setLoading]
  );

  const updateUserProfile = async (name, email, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('profile', { name, email });
      alert(response.data.message);
    } catch (error) {
      handleAxiosError(error);
      console.error(error.response.data);
    }
    setIsLoading(false);
  };

  const updateUserPassword = async (
    currentPassword,
    newPassword,
    confirmNewPassword,
    dispatchCurrentPassword,
    dispatchNewPassword,
    dispatchConfirmNewPassword,
    setIsLoading
  ) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('update-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword,
      });
      alert(response.data.message);
      dispatchCurrentPassword({ type: 'RESET' });
      dispatchNewPassword({ type: 'RESET' });
      dispatchConfirmNewPassword({ type: 'RESET' });
    } catch (error) {
      handleAxiosError(error);
      console.error(error.response.data);
    }
    setIsLoading(false);
  };

  const deleteUserAccount = async (closeModal) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete('delete-account');
      alert(response.data.message);
      localStorage.clear(); // Clear token and session
      closeModal();
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
      console.error(error.response.data);
    }
    setLoading(false);
  };
  return {
    fetchUserProfile,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount,
  };
};

export default useProfileApi;
