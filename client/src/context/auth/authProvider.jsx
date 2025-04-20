import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/refreshToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [tokenRefresh, setTokenRefresh] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const token = Cookies.get("refreshToken");

      if (!token) {
         console.log("No token found, navigating to /login");
         navigate("/login");
         return;
      }

      const fetchAccessToken = async () => {
         try {
            const res = await api.post("/auth/refresh", { token: token });
            console.log("Access Token:", res.data.accessToken);
            setUser({ accessToken: res.data.accessToken });
         } catch (err) {
            console.error("Failed to refresh token:", err);
            navigate("/login");
         }
      };

      fetchAccessToken();
   }, []);

   const login = async (email, password) => {
      try {
         const res = await api.post("/auth/login", { email, password });
         setUser({ accessToken: res.data.accessToken });
         setTokenRefresh(res.data.refreshToken);
      } catch (err) {
         console.error("Login error", err);
         throw new Error("Login failed. Please check your credentials.");
      }
   };

   const logout = () => {
      setUser(null);
      setTokenRefresh(null);
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      navigate("/login");
   };

   return (
      <AuthContext.Provider value={{ user, login, logout, tokenRefresh }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
