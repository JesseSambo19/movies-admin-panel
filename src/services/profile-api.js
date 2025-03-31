import axiosInstance from '../utils/axios';
import { handleAxiosError } from '../utils/handleAxiosError';

export const fetchUserProfile = async (dispatchName, dispatchEmail) => {
  try {
    const response = await axiosInstance.get('profile');
    const { name = '', email = '' } = response.data || {};

    dispatchName({ type: 'USER_INPUT', val: name });
    dispatchEmail({ type: 'USER_INPUT', val: email });
  } catch (error) {
    handleAxiosError(error);
    console.error(error.response?.data || error.message);
  }
};

export const updateUserProfile = async (name, email) => {
  try {
    const response = await axiosInstance.put('profile', { name, email });
    alert(response.data.message);
  } catch (error) {
    handleAxiosError(error);
    console.error(error.response.data);
  }
};

export const updateUserPassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword,
  dispatchCurrentPassword,
  dispatchNewPassword,
  dispatchConfirmNewPassword
) => {
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
};

export const deleteUserAccount = async (closeModal) => {
  try {
    const response = await axiosInstance.delete('delete-account');
    alert(response.data.message);
    localStorage.clear(); // Clear token and session
    // navigate('/login');
    alert('Account deleted successfully');
    closeModal();
    window.location.reload();
  } catch (error) {
    handleAxiosError(error);
    console.error(error.response.data);
  }
};
