// src/Services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/';

// Register user
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register/`, {  // Ensure the endpoint matches the one in your Django urls
      username,
      email,
      password,
    });
    return response.data;  // Return user data or a success message as needed
  } catch (error) {
    throw error.response ? error.response.data : new Error('Registration failed'); // Handle errors appropriately
  }
};

// Login user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}token/`, { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data; // Return user data or tokens as needed
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed'); // Handle errors appropriately
  }
};
