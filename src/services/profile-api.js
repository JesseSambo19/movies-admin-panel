import { useCallback } from 'react';
import { useLoading } from '../store/loading-context';
import axiosInstance from '../utils/axios';
import { handleAxiosError, notifySuccess } from '../utils/handleAxiosFeedback';

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
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const updateUserProfile = async (name, email, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('profile', { name, email });
      // alert(response.data.message);
      notifySuccess(response.data.message);
    } catch (error) {
      handleAxiosError(error);
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserPassword = async (
    currentPassword,
    newPassword,
    confirmNewPassword,
    dispatchCurrentPassword,
    dispatchNewPassword,
    dispatchConfirmNewPassword,
    setFormIsValid,
    setIsLoading
  ) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('update-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword,
      });
      // alert(response.data.message);
      notifySuccess(response.data.message);
      dispatchCurrentPassword({ type: 'RESET' });
      dispatchNewPassword({ type: 'RESET' });
      dispatchConfirmNewPassword({ type: 'RESET' });
      setFormIsValid(false);
    } catch (error) {
      handleAxiosError(error);
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserAccount = async (closeModal, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete('delete-account');
      // alert(response.data.message);
      notifySuccess(response.data.message);
      localStorage.clear(); // Clear token and session
      closeModal();
      window.location.reload();
    } catch (error) {
      handleAxiosError(error);
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    fetchUserProfile,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount,
  };
};

export default useProfileApi;
