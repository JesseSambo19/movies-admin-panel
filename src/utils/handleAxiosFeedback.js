import { toast } from 'react-toastify';
import { useAuth } from '../store/auth-context';
import { useCallback } from 'react';

export const notifyError = (message) => toast.error(message);
export const notifyWarning = (message) => toast.warning(message);
export const notifySuccess = (message) => toast.success(message);

const useErrorHandler = () => {
  const authCtx = useAuth();
  const handleAxiosError = useCallback(
    (error) => {
      // Log full details for devs or monitoring tools
      console.error('Axios error:', error);

      // Graceful message for the user
      let message = 'Something went wrong. Please try again later.';

      if (error.response) {
        const status = error.response.status;

        // Specific status code handling
        if (status === 404) {
          message = 'The service is currently unavailable.';
          notifyError(message);
        } else if (status === 401 || status === 403) {
          message = 'You are not authorized.';
          if (status === 401) {
            notifyWarning('Session expired.');
            // notifyWarning('Session expired. Please log in again.');
            localStorage.clear();
            authCtx.onResetAuthStates();
          } else {
            notifyError(message);
          }
        } else if (status === 400 || status === 422) {
          // Show backend error messages for expected client-side issues
          message = error.response.data?.message || 'Invalid input.';
          notifyError(message);
        } else if (status >= 500 && status < 600) {
          message = 'A server error occurred.';
          notifyError(message);
        } else {
          notifyError(message);
        }
      } else if (error.request) {
        message = 'No response from server. Check your internet connection.';
        notifyError(message);
      } else {
        message = 'An error occurred while sending the request.';
        notifyError(message);
      }

      // notifyError(message);
      // Optionally, you can log the error to an external service here
      // Only during development, you might want to log the full error
      // console.error(error.response.data.message);
      // console.log(error.response.data.message);
      // notifyError(error.response.data.message);
    },
    [authCtx]
  );
  return { handleAxiosError };
};

export default useErrorHandler;
