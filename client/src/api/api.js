import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.REACT_APP_API_URL || "https://authentication-dcvi.onrender.com",
   withCredentials: true,
});

export default api;
