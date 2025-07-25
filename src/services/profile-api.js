import { useCallback } from 'react';
import { useLoading } from '../store/loading-context';
import axiosInstance from '../utils/axios';
import useErrorHandler, { notifySuccess } from '../utils/handleAxiosFeedback';
import { useAuth } from '../store/auth-context';

const useProfileApi = () => {
  const { setLoading } = useLoading();
  const {setUserName, setEmail} = useAuth();
  const { handleAxiosError } = useErrorHandler();
  const fetchUserProfile = useCallback(
    async (dispatchName, dispatchEmail) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('profile');
        const { name, email } = response.data || {};

        dispatchName({ type: 'USER_INPUT', val: name });
        dispatchEmail({ type: 'USER_INPUT', val: email });
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, handleAxiosError]
  );

  const updateUserProfile = async (name, email, setIsLoading) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put('profile', { name, email });

      if (localStorage.getItem('userName') !== response.data.user.name) {
        localStorage.setItem('userName', response.data.user.name);
        setUserName(response.data.user.name);
      } else if (localStorage.getItem('email') !== response.data.user.email) {
        localStorage.setItem('email', response.data.user.email);
        setEmail(response.data.user.email);
      }
      // alert(response.data.message);
      notifySuccess(response.data.message);
    } catch (error) {
      handleAxiosError(error);
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
