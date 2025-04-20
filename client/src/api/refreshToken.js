import axios from "axios";
import Cookies from "js-cookie";

// สร้าง instance ของ axios
const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
   withCredentials: true,
});

// Interceptor: ใส่ accessToken จาก cookie ในทุก request
api.interceptors.request.use((config) => {
   const token = Cookies.get("accessToken");
   if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
   }
   return config;
});

// Interceptor: ตรวจจับ 401 แล้วรีเฟรช token
api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      if (
         error.response &&
         error.response.status === 401 &&
         !originalRequest._retry
      ) {
         originalRequest._retry = true;

         try {
            const res = await axios.post(
               `${
                  import.meta.env.VITE_API_URL || "http://localhost:5000"
               }/refresh`,
               { token: Cookies.get("refreshToken") },
               { withCredentials: true }
            );

            const newAccessToken = res.data.accessToken;

            // เซต access token ใหม่
            Cookies.set("accessToken", newAccessToken, {
               path: "/",
               secure: true,
               sameSite: "Strict",
               expires: 1 / 24, // 1 ชม.
            });

            // ใส่ header ใหม่แล้วยิง request ซ้ำ
            originalRequest.headers[
               "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
         } catch (err) {
            console.error("Refresh token failed", err);
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.href = "/login";
         }
      }

      return Promise.reject(error);
   }
);


export default api;
