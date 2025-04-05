export const handleAxiosError = (error) => {
  // Log full details for devs or monitoring tools
  console.error('Axios error:', error);

  // Graceful message for the user
  let message = 'Something went wrong. Please try again later.';

  if (error.response) {
    const status = error.response.status;

    // Specific status code handling
    if (status === 404) {
      message = 'The service is currently unavailable.';
    } else if (status === 401 || status === 403) {
      message = 'You are not authorized.';
    } else if (status === 400 || status === 422) {
      // Show backend error messages for expected client-side issues
      message = error.response.data?.message || 'Invalid input.';
    } else if (status >= 500 && status < 600) {
      message = 'A server error occurred.';
    }
  } else if (error.request) {
    message = 'No response from server. Check your internet connection.';
  } else {
    message = 'An error occurred while sending the request.';
  }

  alert(`Error: ${message}`);
};

