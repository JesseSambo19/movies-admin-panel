import { toast } from 'react-toastify';

const notifyError = (message) => toast.error(message);
export const notifyWarning = (message) => toast.warning(message);
export const notifySuccess = (message) => toast.success(message);

export const handleAxiosError = (error) => {
  console.error('Axios error:', error);

  let message = 'Something went wrong. Please try again later.';

  if (error.response) {
    const status = error.response.status;

    if (status === 404) {
      message = 'The service is currently unavailable.';
    } else if (status === 401 || status === 403) {
      message = 'You are not authorized.';
    } else if (status === 400 || status === 422) {
      message = error.response.data?.message || 'Invalid input.';
    } else if (status >= 500 && status < 600) {
      message = 'A server error occurred.';
    }
  } else if (error.request) {
    message = 'No response from server. Check your internet connection.';
  } else {
    message = 'An error occurred while sending the request.';
  }

  notifyError(message);
};
