import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_API_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  
});

export default axiosInstance;