import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:5000",
   withCredentials: true,
});

export default api;
