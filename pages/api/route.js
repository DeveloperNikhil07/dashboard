import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/api/login',
      { email, password }, // Send data as JSON
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.data?.success) {
      // Store session token and user details in cookies
      return { data: response.data, isLoginSuccess: true };
    }
    else {
      return { data: null, isLoginSuccess: false };
    }
  } catch (error) {
    console.log('Login failed:', error?.response?.data || error.message);
    throw new Error(error?.response?.data?.detail || 'Login request failed');
  }
};
