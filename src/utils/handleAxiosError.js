export const handleAxiosError = (error) => {
  // alert(error.message)
  if (error.response) {
    // Server responded with an error status (4xx, 5xx)
    console.error('Error Response:', error.response.data);
    console.error('Status Code:', error.response.status);
    console.error('Headers:', error.response.headers);

    alert(`Error: ${error.response.data.message || 'Something went wrong!'}`);
  } else if (error.request) {
    // Request was sent but no response received
    console.error('No Response:', error.request);
    alert('No response from server. Please check your backend.');
  } else {
    // Other errors (e.g., network error, client-side issue)
    console.error('Axios Error:', error.message);
    alert(`Request failed: ${error.message}`);
  }
};
