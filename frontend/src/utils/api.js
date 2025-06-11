import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://mern-chat-app-2-d3k2.onrender.com' // ✅ Update this
    : 'http://localhost:8000',
  withCredentials: true,
});

export default API;
