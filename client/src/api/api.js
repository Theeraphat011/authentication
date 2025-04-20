import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.REACT_APP_API_URL || "https://authentication-production-1a7c.up.railway.app",
   withCredentials: true,
});

export default api;
