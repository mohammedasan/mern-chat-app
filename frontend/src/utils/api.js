import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://your-backend.onrender.com' // ✅ Update this
    : 'http://localhost:8000',
  withCredentials: true,
});

export default API;
