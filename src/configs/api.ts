import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://localhost:3000', // Replace with your API base URL
  withCredentials: true, // Include cookies in requests
});
export default api;